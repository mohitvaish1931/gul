import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Order from './models/Order.js';

const run = async () => {
  await connectDB();
  const order = await Order.findOne({ 'shippingAddress.name': { $regex: /anjali/i } });
  if (order) {
    if (order.orderItems && order.orderItems.length > 0) {
      order.orderItems[0].selectedSize = 'M';
      await order.save();
      console.log('Updated order with size M');
    }
  } else {
    console.log('Order not found');
  }
  process.exit(0);
};

run();
