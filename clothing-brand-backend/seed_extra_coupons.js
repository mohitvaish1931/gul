import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

// Function to generate a random 8-character alphanumeric string
const generateRandomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const seedExtraCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    let createdCount = 0;

    for (let i = 0; i < 13; i++) {
      let code = generateRandomCode();
      
      // Ensure it's unique
      let exists = await Coupon.findOne({ code });
      while (exists) {
        code = generateRandomCode();
        exists = await Coupon.findOne({ code });
      }

      await Coupon.create({
        code,
        discountPercent: 100,
        active: true
      });
      
      console.log(`Created 100% OFF coupon: ${code}`);
      createdCount++;
    }
    
    console.log(`\nSuccessfully created ${createdCount} extra 100% OFF coupons!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding coupons:', error);
    process.exit(1);
  }
};

seedExtraCoupons();
