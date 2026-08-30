import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const mergeToTops = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    // Move everything in 'Co-ord & Shrug Sets' to 'Tops'
    const result = await Product.updateMany(
      { category: 'Co-ord & Shrug Sets' },
      { $set: { category: 'Tops' } }
    );
    console.log(`Merged ${result.modifiedCount} products into Tops category.`);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

mergeToTops();
