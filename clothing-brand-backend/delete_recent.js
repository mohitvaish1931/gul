import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const deleteRecent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    // Delete products created in the last 30 minutes
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    const result = await Product.deleteMany({
      createdAt: { $gte: thirtyMinsAgo }
    });

    console.log(`Deleted ${result.deletedCount} recently added products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

deleteRecent();
