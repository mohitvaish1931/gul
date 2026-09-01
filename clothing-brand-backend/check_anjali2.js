import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Order from './models/Order.js';

const run = async () => {
  await connectDB();
  const orders = await Order.find({ 'shippingAddress.name': { $regex: /anjali/i } });
  console.log(JSON.stringify(orders, null, 2));
  process.exit(0);
};

run();
