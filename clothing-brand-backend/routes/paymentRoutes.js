import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import { createShipmozoOrder } from '../utils/shipmozo.js';

const router = express.Router();

// @desc    Get Razorpay Key ID
// @route   GET /api/payment/razorpay/config
router.get('/razorpay/config', (req, res) => {
  res.send({ keyId: process.env.RAZORPAY_KEY_ID || 'mock_key_for_testing' });
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/razorpay
router.post('/razorpay', async (req, res) => {
  try {
    const { amount, receipt } = req.body;

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

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ message: 'Something went wrong with Razorpay', error });
  }
});

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
router.post('/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      mongo_order_id,
      user_details // Optional, for shipmozo if guest
    } = req.body;

    // Verify signature only if keys exist (skip in mock mode)
    if (process.env.RAZORPAY_KEY_SECRET && !razorpay_order_id.startsWith('order_mock_')) {
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature !== expectedSign) {
        return res.status(400).json({ message: 'Invalid signature sent!' });
      }
    }

    // Update MongoDB Order
    const order = await Order.findById(mongo_order_id).populate('user', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentStatus = 'Paid';
    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

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

    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Payment verified and order processed successfully', order: updatedOrder });

  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

export default router;
