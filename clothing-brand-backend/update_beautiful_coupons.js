import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from './models/Coupon.js';

dotenv.config();

const uglyCodes = [
  'H4Y5A376', 'KF0EY0PG', 'TRNKPY3K', '8LVR4SCQ', 'RBZY6DCQ', 
  'NMMEUBC1', 'JR8IE3U1', 'S27SFM4R', 'FHCEH5ZW', 'YNKZPZ01', 
  'CC3FSOPS', 'UMBBNGHA', '3BUE1I1M',
  '7U3S497Q', 'WIF34K2S', 'EN4Z6Z4D', 'YN6E26X3', 'XDJYF7O7', 
  'ZIFB8KOS', 'UJ8L6M3R', '9E0P070N', 'ZN54L69S', '03P3XUOM', 
  'UMM63T1I', '8GIVF9DB', 'Y09I0W3A'
];

const beautifulCodes = [
  'GULVIP99',
  'GULFREE1',
  'GUL100X1',
  'GULGIFT8',
  'GULLUCK7',
  'GULPRO99',
  'GULSTAR1',
  'GULMAGIC',
  'GULFEST1',
  'GULTREND',
  'GULQUEEN',
  'GULROYAL',
  'GULLOVE1'
];

const updateCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    // Remove the ugly codes
    const delRes = await Coupon.deleteMany({ code: { $in: uglyCodes } });
    console.log(`Deleted ${delRes.deletedCount} ugly coupon codes.`);

    // Insert the beautiful ones
    for (const code of beautifulCodes) {
      const exists = await Coupon.findOne({ code });
      if (!exists) {
        await Coupon.create({
          code,
          discountPercent: 100,
          active: true
        });
        console.log(`Created beautiful 100% OFF coupon: ${code}`);
      } else {
        console.log(`Coupon already exists: ${code}`);
      }
    }
    
    console.log('Successfully updated coupons!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating coupons:', error);
    process.exit(1);
  }
};

updateCoupons();
