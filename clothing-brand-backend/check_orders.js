import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';

dotenv.config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const order = await Order.findOne({}).sort({ createdAt: -1 });
    console.log(JSON.stringify(order, null, 2));
    
    // Let's also update all past orders that don't have selectedSize
    const result = await Order.updateMany(
      { "orderItems.selectedSize": { $exists: false } },
      { $set: { "orderItems.$[elem].selectedSize": "L" } },
      { arrayFilters: [ { "elem.selectedSize": { $exists: false } } ] }
    );
    console.log("Update result:", result);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

check();
