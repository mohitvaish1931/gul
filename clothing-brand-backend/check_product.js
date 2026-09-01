import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import Product from './models/Product.js';

const run = async () => {
  await connectDB();
  const product = await Product.findById('6a252ab17f132b824e45bc32');
  console.log(JSON.stringify(product, null, 2));
  process.exit(0);
};

run();
