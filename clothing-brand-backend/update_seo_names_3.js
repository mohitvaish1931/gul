import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updates = [
  { idStart: '6a61f8eb', name: 'Olive Green Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8ec', name: 'Mustard Orange Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8f1', name: 'Orange Floral Print Premium Kurta Set for Women' },
  { idStart: '6a61f8f4', name: 'Rust Orange Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8f5', name: 'Lime Green Premium Designer Kurta Set for Women' },
  { idStart: '6a61f8fe', name: 'Navy Blue Embroidered Premium Kurta Set for Women' },
  { idStart: '6a61f90c', name: 'Olive Green Embroidered Premium Kurta Set for Women' },
  { idStart: '6a61f912', name: 'Mustard Yellow Premium Designer Kurta Set for Women' },
  { idStart: '6a61f918', name: 'Charcoal Grey Premium Designer Kurta Set for Women' },
  { idStart: '6a61f919', name: 'Olive Green Festive Kurta Set for Women' },
  { idStart: '6a61f91a', name: 'Brick Red Premium Designer Kurta Set for Women' }
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
