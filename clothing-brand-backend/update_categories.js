import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const migrateCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for category migration!");

    // 1. Rename Suits to Suit Sets
    const resSuits = await Product.updateMany({ category: 'Suits' }, { $set: { category: 'Suit Sets' } });
    console.log(`Updated ${resSuits.modifiedCount} products from 'Suits' to 'Suit Sets'.`);

    // 2. Rename Tops to Tops & Co-ord Sets
    const resTops = await Product.updateMany({ category: 'Tops' }, { $set: { category: 'Tops & Co-ord Sets' } });
    console.log(`Updated ${resTops.modifiedCount} products from 'Tops' to 'Tops & Co-ord Sets'.`);

    // 3. Rename Three Piece Tops to Shrug Sets
    const resThree = await Product.updateMany({ category: 'Three Piece Tops' }, { $set: { category: 'Shrug Sets' } });
    console.log(`Updated ${resThree.modifiedCount} products from 'Three Piece Tops' to 'Shrug Sets'.`);

    // 4. Rename Kurtis to Maxis & Dresses
    const resKurtis = await Product.updateMany({ category: 'Kurtis' }, { $set: { category: 'Maxis & Dresses' } });
    console.log(`Updated ${resKurtis.modifiedCount} products from 'Kurtis' to 'Maxis & Dresses'.`);

    console.log("\nMigration completed successfully!");

    // Verify current category counts
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    console.log("\nUpdated Products by Category:");
    categories.forEach(cat => {
      console.log(`- ${cat._id || 'No Category'}: ${cat.count} products`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
};

migrateCategories();
