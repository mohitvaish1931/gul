import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import Coupon from '../models/Coupon.js';
import { createShipmozoOrder } from '../utils/shipmozo.js';
import { protect, canAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get Razorpay Key ID
// @route   GET /api/payment/razorpay/config
router.get('/razorpay/config', (req, res) => {
  res.send({ keyId: process.env.RAZORPAY_KEY_ID || 'mock_key_for_testing' });
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/razorpay
router.post('/razorpay', protect, async (req, res) => {
  try {
    // `receipt` is our MongoDB order id; the amount always comes from that order, never from the client
    const order = await Order.findById(req.body.receipt);
    if (!order || !canAccess(req, order.user)) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.isPaid) {
      return res.status(400).json({ message: 'Order is already paid' });
    }
    const amount = order.totalPrice;
    const receipt = String(order._id);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Mock mode for testing if keys are missing
      console.log('Razorpay keys missing, returning mock order');
      return res.status(200).json({
        id: 'order_mock_' + Date.now(),
        currency: 'INR',
        amount: amount * 100
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: receipt
    };

    const razorpayOrder = await instance.orders.create(options);

    // Remember which Razorpay order belongs to this order so /verify can match them
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json(razorpayOrder);
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ message: 'Something went wrong with Razorpay', error });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      mongo_order_id,
      user_details // Optional, for shipmozo if guest
    } = req.body;

    const order = await Order.findById(mongo_order_id).populate('user', 'name email');

    if (!order || !canAccess(req, order.user)) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Already processed - don't mark paid or create a shipment twice
    if (order.isPaid) {
      return res.status(200).json({ message: 'Order already paid' });
    }

    // Signature is skipped only in mock mode, i.e. when Razorpay keys are not configured at all
    if (process.env.RAZORPAY_KEY_SECRET) {
      if (!razorpay_order_id || razorpay_order_id !== order.razorpayOrderId) {
        return res.status(400).json({ message: 'Payment does not match this order' });
      }

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      const received = Buffer.from(String(razorpay_signature || ''));
      const expected = Buffer.from(expectedSign);
      if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
        return res.status(400).json({ message: 'Invalid signature sent!' });
      }
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentStatus = 'Paid';
    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    if (user_details && user_details.name) {
      if (order.shippingAddress && !order.shippingAddress.name) {
        order.shippingAddress.name = user_details.name;
      }
    }
    if (user_details && user_details.email) {
      if (order.shippingAddress && !order.shippingAddress.email) {
        order.shippingAddress.email = user_details.email;
      }
    }

    // Trigger Shipmozo Automation
    console.log('Payment verified, triggering Shipmozo...');
    const shipmozoData = await createShipmozoOrder(order, user_details || order.user);

    if (shipmozoData) {
      order.awbNumber = shipmozoData.awbNumber;
      order.courierName = shipmozoData.courierName;
      order.trackingUrl = shipmozoData.trackingUrl;
      order.labelPdf = shipmozoData.labelPdf;
      order.orderStatus = 'packed'; // Auto-pack since AWB is generated
    }

    if (order.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: order.couponCode },
        { $inc: { used: 1 } }
      );
    }

    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Payment verified and order processed successfully', order: updatedOrder });

  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.post('/bypass', protect, async (req, res) => {
  try {
    const { mongo_order_id, user_details } = req.body;
    const order = await Order.findById(mongo_order_id).populate('user', 'name email');
    
    if (!order || !canAccess(req, order.user)) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.isPaid) {
      return res.json({ success: true });
    }

    if (order.totalPrice > 0) {
      return res.status(400).json({ error: 'Cannot bypass payment for non-zero amount' });
    }

    order.paymentStatus = 'Paid';
    order.isPaid = true;
    order.paidAt = Date.now();

    // Trigger Shipmozo Automation
    console.log('Payment bypassed (100% off), triggering Shipmozo...');
    const shipmozoData = await createShipmozoOrder(order, user_details || order.user);

    if (shipmozoData) {
      order.awbNumber = shipmozoData.awbNumber;
      order.courierName = shipmozoData.courierName;
      order.trackingUrl = shipmozoData.trackingUrl;
      order.labelPdf = shipmozoData.labelPdf;
    }

    if (order.couponCode) {
      await Coupon.findOneAndUpdate(
        { code: order.couponCode },
        { $inc: { used: 1 } }
      );
    }

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error('Bypass Payment Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
