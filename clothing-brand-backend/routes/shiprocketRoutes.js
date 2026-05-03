import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * Shiprocket Webhook Handler
 * This endpoint should be configured in the Shiprocket Panel:
 * Settings > API > Webhooks
 */
router.post('/webhook', async (req, res) => {
  try {
    // Log the incoming webhook for debugging
    // console.log('Shiprocket Webhook received:', JSON.stringify(req.body, null, 2));

    const { awb, shipment_id, status, current_status, order_id } = req.body;

    // Find the order by Shiprocket shipment ID or our Mongoose ID (order_id in sr)
    const order = await Order.findOne({
      $or: [
        { shiprocketShipmentId: String(shipment_id) },
        { _id: order_id }
      ]
    });

    if (!order) {
      // console.warn('Order not found for Shiprocket webhook:', shipment_id);
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update tracking info
    if (awb) order.awbNumber = awb;
    if (current_status) order.trackingStatus = current_status;

    // Map Shiprocket status to our Order status
    const srStatus = (current_status || status || '').toLowerCase();
    
    if (srStatus.includes('delivered')) {
      order.status = 'Delivered';
    } else if (srStatus.includes('shipped') || srStatus.includes('in transit') || srStatus.includes('out for delivery')) {
      order.status = 'Shipped';
    } else if (srStatus.includes('cancelled')) {
      order.status = 'Cancelled';
    }

    await order.save();

    res.json({ success: true });
  } catch (err) {
    console.error('Shiprocket Webhook Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
