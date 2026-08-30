import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updates = [
  { idStart: '6a61f834', name: 'Wine Embroidered Roman Silk Kurta Set for Women' },
  { idStart: '6a61f835', name: 'Teal Blue Roman Silk Designer Kurta Set for Women' },
  { idStart: '6a61f83d', name: 'Mustard Yellow Roman Silk Kurta Set for Women' },
  { idStart: '6a61f843', name: 'Mustard Embroidered Designer Kurta Set for Women' },
  { idStart: '6a61f84c', name: 'Rust Orange Party Wear Kurta Set for Women' },
  { idStart: '6a61f855', name: 'Maroon Embroidered Festive Kurta Set for Women' },
  { idStart: '6a61f85b', name: 'Red Anarkali Style Kurta Set for Women' },
  { idStart: '6a61f864', name: 'Orange Designer Roman Silk Kurta Set for Women' },
  { idStart: '6a61f86d', name: 'Plum Embroidered Kurta Set with Dupatta' },
  { idStart: '6a61f874', name: 'Pink Festive Designer Kurta Set for Women' },
  { idStart: '6a61f87a', name: 'White Embroidered Cotton Top for Women' },
  { idStart: '6a61f881', name: 'Ivory Pakistani Cotton Kurta Set for Women' }
];

const updateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    const allProducts = await Product.find({});
    
    let updatedCount = 0;
    for (const update of updates) {
      const product = allProducts.find(p => p._id.toString().startsWith(update.idStart));
      if (product) {
        product.name = update.name;
        // Optionally update the SEO slug if your system uses it. The current schema doesn't have a required slug.
        await product.save();
        console.log(`Updated product ${product._id} to name: "${product.name}"`);
        updatedCount++;
      } else {
        console.log(`Product NOT FOUND for id starting with ${update.idStart}`);
      }
    }
    
    console.log(`Successfully updated ${updatedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateProducts();
