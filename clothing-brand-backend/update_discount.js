import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

const codes = [
  'KURTI5045', 'KURTI1258', 'KURTI7875', 'KURTI5485', 'KURTI1358',
  'KURTI1238', 'KURTI5036', 'KURTI6268', 'KURTI6710', 'KURTI4441'
];

const updateCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');
    
    const result = await Coupon.updateMany(
      { code: { $in: codes } },
      { $set: { discountPercent: 100 } }
    );
    
    console.log(`Updated ${result.modifiedCount} coupons to 100% discount.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateCoupons();
