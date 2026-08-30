import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const printCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const agg = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    console.log('DB Categories:', agg);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
printCategories();
