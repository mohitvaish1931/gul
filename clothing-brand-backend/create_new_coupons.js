import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

const coupons = [];

// Create 10 regular coupons (100% off, max 800)
for (let i = 1; i <= 10; i++) {
  coupons.push({
    code: `GUL${Math.floor(1000 + Math.random() * 9000)}`,
    discountPercent: 100,
    active: true,
    usageLimit: 1,
    maxDiscountAmount: 800
  });
}

// Create 1 special coupon (100% off, max 1000)
coupons.push({
  code: `SPECIAL${Math.floor(1000 + Math.random() * 9000)}`,
  discountPercent: 100,
  active: true,
  usageLimit: 1,
  maxDiscountAmount: 1000
});

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');
    
    let added = 0;
    for (const data of coupons) {
      const exists = await Coupon.findOne({ code: data.code });
      if (!exists) {
        await Coupon.create(data);
        console.log(`Created coupon: ${data.code} (Max: ${data.maxDiscountAmount})`);
        added++;
      }
    }
    
    console.log(`Done. Added ${added} coupons.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seed();
