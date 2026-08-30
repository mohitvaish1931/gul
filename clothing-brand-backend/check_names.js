import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updates = [
  { id: '6a61f834', name: 'Wine Embroidered Roman Silk Kurta Set for Women' },
  { id: '6a61f835', name: 'Teal Blue Roman Silk Designer Kurta Set for Women' },
  { id: '6a61f83d', name: 'Mustard Yellow Roman Silk Kurta Set for Women' },
  { id: '6a61f843', name: 'Mustard Embroidered Designer Kurta Set for Women' },
  { id: '6a61f84c', name: 'Rust Orange Party Wear Kurta Set for Women' },
  { id: '6a61f855', name: 'Maroon Embroidered Festive Kurta Set for Women' },
  { id: '6a61f85b', name: 'Red Anarkali Style Kurta Set for Women' },
  { id: '6a61f864', name: 'Orange Designer Roman Silk Kurta Set for Women' },
  { id: '6a61f86d', name: 'Plum Embroidered Kurta Set with Dupatta' },
  { id: '6a61f874', name: 'Pink Festive Designer Kurta Set for Women' },
  { id: '6a61f87a', name: 'White Embroidered Cotton Top for Women' },
  { id: '6a61f881', name: 'Ivory Pakistani Cotton Kurta Set for Women' }
];

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const allProducts = await Product.find({});
    
    for (const update of updates) {
      const product = allProducts.find(p => p._id.toString().includes(update.id));
      if (product) {
        console.log(`Found product for ${update.id}: Current Name = "${product.name}" (_id: ${product._id})`);
      } else {
        console.log(`Product NOT FOUND for ${update.id}`);
      }
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkProducts();
