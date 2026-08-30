import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const printCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const agg = await Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]);
    console.log("Categories:", agg);
    const agg2 = await Product.aggregate([{ $match: { category: 'Tops' } }, { $group: { _id: '$subcategory', count: { $sum: 1 } } }]);
    console.log("Tops subcategories:", agg2);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

printCategories();
