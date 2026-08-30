import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updates = [
  { idStart: '6a61f886', name: 'Pink Sanganeri Print Anarkali Kurta Set for Women' },
  { idStart: '6a61f88d', name: 'Mustard Yellow Sanganeri Print Kurta Set for Women' },
  { idStart: '6a61f8a4', name: 'Brown Embroidered Cotton Kurta Set for Women' },
  { idStart: '6a61f8aa', name: 'White Embroidered Cotton Kurta Set for Women' },
  { idStart: '6a61f8ae', name: 'Maroon Embroidered Cotton Kurta Set for Women' },
  { idStart: '6a61f8b4', name: 'Navy Blue Embroidered Cotton Kurta Set for Women' },
  { idStart: '6a61f8c7', name: 'Black Embroidered Cotton Kurta Set for Women' },
  { idStart: '6a61f8cb', name: 'Teal Blue Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8d1', name: 'Lavender Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8d7', name: 'Pastel Yellow Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8de', name: 'Olive Green Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8df', name: 'Rust Orange Premium Designer Kurta Set for Women' }
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
