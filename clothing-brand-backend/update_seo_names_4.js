import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const updates = [
  { idStart: '6a61f91b', name: 'Rani Pink Premium Designer Kurta Set for Women' },
  { idStart: '6a61f92f', name: 'Royal Blue Premium Designer Kurta Set for Women' },
  { idStart: '6a61f930', name: 'Chocolate Brown Printed Kurta Set for Women' },
  { idStart: '6a61f932', name: 'Coral Red Premium Designer Kurta Set for Women' },
  { idStart: '6a61f939', name: 'Mustard Gold Premium Designer Kurta Set for Women' },
  { idStart: '6a61f947', name: 'Beige Printed Premium Kurta Set for Women' },
  { idStart: '6a61f952', name: 'Lavender Premium Designer Kurta Set for Women' },
  { idStart: '6a61f959', name: 'Rose Pink Premium Designer Kurta Set for Women' },
  { idStart: '6a61f95a', name: 'Black Premium Designer Kurta Set for Women' },
  { idStart: '6a61f970', name: 'Orange Premium Designer Kurta Set for Women' }
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

    // Handle the duplicates
    const dupes = allProducts.filter(p => p._id.toString().startsWith('6a61f92e'));
    if (dupes.length === 2) {
       // Assuming order matches creation order
       const sortedDupes = dupes.sort((a, b) => a._id.toString().localeCompare(b._id.toString()));
       sortedDupes[0].name = 'Rust Orange Premium Designer Kurta Set for Women';
       await sortedDupes[0].save();
       console.log(`Updated product ${sortedDupes[0]._id} to name: "Rust Orange Premium Designer Kurta Set for Women"`);
       updatedCount++;
       
       sortedDupes[1].name = 'Mustard Yellow Premium Designer Kurta Set for Women';
       await sortedDupes[1].save();
       console.log(`Updated product ${sortedDupes[1]._id} to name: "Mustard Yellow Premium Designer Kurta Set for Women"`);
       updatedCount++;
    }

    console.log(`Successfully updated ${updatedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateProducts();
