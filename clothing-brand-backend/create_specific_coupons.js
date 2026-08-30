import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

const codes = [];
for (let i = 1; i <= 10; i++) {
  codes.push(`KURTI${Math.floor(1000 + Math.random() * 9000)}`);
}

const coupons = codes.map((code) => ({
  code,
  discountPercent: 50,
  active: true,
  usageLimit: 1,
  applicableCategories: ["Kurta Sets", "Tops"],
  maxPriceThreshold: 800
}));

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');
    let added = 0;
    for (const data of coupons) {
      const exists = await Coupon.findOne({ code: data.code });
      if (!exists) {
        await Coupon.create(data);
        console.log(`Created coupon: ${data.code}`);
        added++;
      } else {
        console.log(`Already exists: ${data.code}`);
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
