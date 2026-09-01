import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = await Product.find({});
    
    let noSizes = 0;
    for(const p of products) {
      if(!p.sizes || p.sizes.length === 0) {
        noSizes++;
      }
    }
    console.log(`Total products: ${products.length}, Products without sizes: ${noSizes}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

check();
