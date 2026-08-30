import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

const validCodes = [
  'KURTI5045', 'KURTI1258', 'KURTI7875', 'KURTI5485', 'KURTI1358',
  'KURTI1238', 'KURTI5036', 'KURTI6268', 'KURTI6710', 'KURTI4441'
];

const invalidate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');
    
    // Set active: false for all coupons NOT in the validCodes list
    const result = await Coupon.updateMany(
      { code: { $nin: validCodes } },
      { $set: { active: false } }
    );
    
    console.log(`Deactivated ${result.modifiedCount} old coupons.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

invalidate();
