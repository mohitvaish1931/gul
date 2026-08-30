import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const allProducts = await Product.find({});
    
    // Find all products whose IDs start with 6a61f92
    const matches = allProducts.filter(p => p._id.toString().startsWith('6a61f92'));
    console.log("Products starting with 6a61f92:");
    matches.forEach(p => console.log(`- ${p._id}: ${p.name}`));

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkProducts();
