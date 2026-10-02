import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { priceOrder } from '../utils/orderPricing.js';
import { protect, adminOnly, canAccess } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { notifyOrderStatusChange } from '../utils/orderNotifications.js';
import { sendMailInBackground, getStoreEmail } from '../utils/mailer.js';
import { exchangeRequestOwnerEmail, exchangeRequestCustomerEmail, orderRecipient } from '../utils/emailTemplates.js';

const EXCHANGE_WINDOW_DAYS = 7;

const router = express.Router();

const trackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Too many tracking requests. Please try again later.',
});

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// @desc    Create new order
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      couponCode,
    } = req.body;

    // Prices, discount and total are always calculated on the server
    const pricing = await priceOrder(orderItems, couponCode);

    const order = new Order({
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      ...pricing,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// @desc    Track an order with its order number (full id or the 8-character number shown to customers) and email
// @route   POST /api/orders/track
router.post('/track', trackLimiter, async (req, res) => {
  const orderNumber = String(req.body.orderNumber || '').trim().replace(/^#/, '').toLowerCase();
  const email = String(req.body.email || '').trim();
  const notFoundMessage = 'Order not found. Please check your order number and email.';

  if (!/^[0-9a-f]{6,24}$/.test(orderNumber) || !email) {
    return res.status(404).json({ message: notFoundMessage });
  }

  const emailMatch = new RegExp(`^${escapeRegex(email)}$`, 'i');
  const users = await User.find({ email: emailMatch }).select('_id');
  const orders = await Order.find({
    $or: [{ 'shippingAddress.email': emailMatch }, { user: { $in: users.map((u) => u._id) } }],
  }).sort({ createdAt: -1 });

  const order = orders.find((o) => String(o._id).startsWith(orderNumber));
  if (!order) {
    return res.status(404).json({ message: notFoundMessage });
  }

  const status = order.status === 'Pending' && order.orderStatus
    ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
    : order.status;

  res.json({
    success: true,
    order: {
      _id: order._id,
      orderNumber: `#${String(order._id).substring(0, 8)}`,
      status,
      createdAt: order.createdAt,
      totalAmount: order.totalPrice,
      shippingAddress: {
        name: order.shippingAddress?.name,
        city: order.shippingAddress?.city,
      },
      items: order.orderItems.map((item) => ({
        name: item.name,
        quantity: item.qty,
        price: item.price,
        image: item.image,
      })),
      courierName: order.courierName,
      awbNumber: order.awbNumber,
      trackingUrl: order.trackingUrl,
    },
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
router.get('/', adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my/:userId
router.get('/my/:userId', protect, async (req, res) => {
  try {
    if (!canAccess(req, req.params.userId)) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// @desc    Get order by ID (owner or admin)
// @route   GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order && canAccess(req, order.user)) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
router.put('/:id/status', adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const previousStatus = order.status;
    order.status = req.body.status || order.status;
    if (req.body.status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    if (req.body.paymentStatus) {
      order.paymentStatus = req.body.paymentStatus;
      if (req.body.paymentStatus === 'Paid') {
        order.isPaid = true;
        order.paidAt = Date.now();
      }
    }

    const updatedOrder = await order.save();
    await updatedOrder.populate('user', 'name email');
    notifyOrderStatusChange(updatedOrder, previousStatus);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

// @desc    Request a size exchange (customer, within 7 days of delivery)
// @route   POST /api/orders/:id/exchange
router.post('/:id/exchange', protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order || !canAccess(req, order.user)) {
    return res.status(404).json({ message: 'Order not found' });
  }
  if (order.status !== 'Delivered') {
    return res.status(400).json({ message: 'Exchanges can be requested after your order is delivered.' });
  }
  const deliveredAt = order.deliveredAt || order.updatedAt;
  if (Date.now() - new Date(deliveredAt).getTime() > EXCHANGE_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
    return res.status(400).json({ message: 'The 7-day exchange window for this order has ended.' });
  }
  if (order.exchangeRequest?.status) {
    return res.status(400).json({ message: 'An exchange has already been requested for this order.' });
  }

  const reason = String(req.body.reason || '').trim().slice(0, 200);
  if (!reason) {
    return res.status(400).json({ message: 'Please choose a reason for the exchange.' });
  }

  order.exchangeRequest = {
    reason,
    preferredSize: String(req.body.preferredSize || '').trim().slice(0, 20),
    details: String(req.body.details || '').trim().slice(0, 1000),
    status: 'requested',
    requestedAt: new Date(),
  };
  const saved = await order.save();

  sendMailInBackground({ to: getStoreEmail(), replyTo: orderRecipient(saved) || undefined, ...exchangeRequestOwnerEmail(saved) });
  sendMailInBackground({ to: orderRecipient(saved), ...exchangeRequestCustomerEmail(saved) });

  res.json(saved);
});

// @desc    Update an exchange request status (Admin)
// @route   PUT /api/orders/:id/exchange
router.put('/:id/exchange', adminOnly, async (req, res) => {
  const allowed = ['requested', 'approved', 'rejected', 'completed'];
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: 'Invalid exchange status' });
  }
  const order = await Order.findById(req.params.id);
  if (!order || !order.exchangeRequest?.status) {
    return res.status(404).json({ message: 'Exchange request not found' });
  }
  order.exchangeRequest.status = req.body.status;
  res.json(await order.save());
});

// @desc    Delete an order (Admin)
// @route   DELETE /api/orders/:id
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order removed' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});

export default router;
