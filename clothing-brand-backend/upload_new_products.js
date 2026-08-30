import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Product from './models/Product.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Naming arrays
let idx11 = 0, idx12 = 0, idx13 = 0, idx14 = 0, idx15 = 0;

function getName(folder) {
  if (folder.includes("Folder 11")) {
    idx11++;
    return `Roman Silk 3-Piece Suit Set ${idx11 > 1 ? `(Design ${idx11})` : ''}`;
  } else if (folder.includes("Folder 12")) {
    idx12++;
    return `Ivory Pakistani Cotton Suit ${idx12 > 1 ? `(Design ${idx12})` : ''}`;
  } else if (folder.includes("Folder 13")) {
    idx13++;
    return `Sanganeri Print Anarkali Kurta Set ${idx13 > 1 ? `(Design ${idx13})` : ''}`;
  } else if (folder.includes("Folder 14")) {
    idx14++;
    return `Elegant Embroidered Cotton Suit Set ${idx14 > 1 ? `(Design ${idx14})` : ''}`;
  } else {
    idx15++;
    return `Premium Designer Kurta Set ${idx15 > 1 ? `(Design ${idx15})` : ''}`;
  }
}

const folderConfig = {
  "Folder 11": {
    category: "Suits",
    subcategory: "Silk Suits",
    price: 1099,
    originalPrice: 1599,
    sizes: ['M', 'L', 'XL', 'XXL'],
    materials: ['Heavy Pure Roman Silk', 'Organza'],
    specifications: ['Embroidery Coding Full Neck', 'Matching pants', 'Potali bag included', 'Lining attached'],
    description: "Featuring Beautiful Suit Sets in Heavy Pure Roman Silk Top with Full Coding Zari work. It is paired with matching pants and an Organza Dupatta. Beautifully decorated designs With Embroidery Coding Full Neck. Includes a matching Potali bag."
  },
  "Folder 12": {
    category: "Suits",
    subcategory: "Pakistani Suits",
    price: 645,
    originalPrice: 999,
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    materials: ['Cotton'],
    specifications: ['Lace Work', 'Kurti Length: 44 inches', 'Bottom Length: 39 inches', '3/4 Sleeves'],
    description: "Featuring Ivory Pakistani Suit which is beautifully decorated with new prints, and lace detailings all-over. Absolutely perfect for your upcoming occasions, it is very easy breezy and comfortable cotton dress."
  },
  "Folder 13": {
    category: "Kurta Sets",
    subcategory: "Anarkali Sets",
    price: 850,
    originalPrice: 1299,
    sizes: ['M', 'L', 'XL', 'XXL'],
    materials: ['Cotton'],
    specifications: ['Sanganeri print', 'Long sleeve 20 inches with dori detailing', 'Kurti length 46-47 inches', 'Pant length 39 inches', 'Dupatta length 2.25meter Cotton malmal'],
    description: "Look straight out of a dreamy movie set as you turn around and walk in this elegant flaired Anarkali suit! The perfect traditional wear with new style in sanganeri print."
  },
  "Folder 14": {
    category: "Kurta Sets",
    subcategory: "Embroidered Sets",
    price: 899,
    originalPrice: 1499,
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    materials: ['Pure Cotton'],
    specifications: ['Embroidery Yoke', 'Lace Detailing', 'Printed Mulmul Dupatta 2.30 Mtr', 'Kurti 46 inches', 'Palazzo 38 inches'],
    description: "Elegant Embroidered Cotton Suit Set with Premium embroidery work on the neckline yoke, enhanced with delicate lace detailing. Paired with matching cotton palazzo featuring embroidery border and a soft printed mulmul dupatta. Made in breathable Pure Cotton – perfect for daily wear, office wear & casual outings."
  },
  "Folder 15": {
    category: "Kurta Sets",
    subcategory: "Designer Sets",
    price: 2499,
    originalPrice: 3499,
    sizes: ['M', 'L', 'XL', 'XXL'],
    materials: ['Premium Blend'],
    specifications: ['Designer Collection', 'Exquisite Craftsmanship'],
    description: "From our designer collection, this Kurta Set offers exquisite craftsmanship and an elegant silhouette for your special moments."
  }
};

const importData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@gulfashion.com' });
    if (!adminUser) {
      throw new Error("Admin user admin@gulfashion.com not found. Run standard seeder first.");
    }
    const adminId = adminUser._id;

    // Load drive contents
    const jsonPath = path.join(__dirname, '../new_drive_contents.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`new_drive_contents.json not found at ${jsonPath}`);
    }
    const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Group files by product
    const grouped = {};
    rawData.forEach(item => {
      if (item.path.includes('.pdf') || !item.path.includes('/')) return;
      
      const parts = item.path.split('/');
      const folder = parts[0];
      const filename = parts[1];
      
      let baseName = filename;
      const match = filename.match(/(WhatsApp Image\s+\d{4}-\d{2}-\d{2}\s+at\s+\d+\.\d+\.\d+\s+[AP]M)(?:\s+\(\d+\))?\.jpe?g/i);
      const imgMatch = filename.match(/(IMG-\d{8}-WA\d{4})(?:-\d+)?\.jpe?g/i);
      
      if (match) {
        baseName = match[1];
      } else if (imgMatch) {
        const stripped = filename.replace(/\(\d+\)/, '').trim();
        baseName = stripped;
      }
      
      const key = `${folder}/${baseName}`;
      if (!grouped[key]) {
        grouped[key] = {
          folder,
          baseName,
          files: []
        };
      }
      grouped[key].files.push(item);
    });

    const productsList = Object.values(grouped);
    console.log(`Grouped into ${productsList.length} unique products.`);

    const uploadBase = path.join(__dirname, '../drive_downloads');

    let processedCount = 0;
    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    const lastProduct = await Product.findOne().sort('-displayOrder');
    let displayOrderCounter = lastProduct ? (lastProduct.displayOrder || 0) + 1 : 1;

    for (let i = 0; i < productsList.length; i++) {
      const p = productsList[i];
      const config = folderConfig[p.folder];
      if (!config) {
        skippedCount++;
        continue;
      }

      processedCount++;
      const name = getName(p.folder);
      console.log(`\n[${processedCount}/${productsList.length}] Processing Product: "${name}" (${p.folder})`);

      const imageUrls = [];
      let uploadSuccess = true;

      for (let fileIdx = 0; fileIdx < p.files.length; fileIdx++) {
        const fileItem = p.files[fileIdx];
        const localPath = path.join(uploadBase, ...fileItem.path.split('/'));

        if (!fs.existsSync(localPath)) {
          console.warn(`File does not exist: ${localPath}`);
          uploadSuccess = false;
          break;
        }

        try {
          console.log(`  Uploading image ${fileIdx + 1}/${p.files.length} to Cloudinary...`);
          const result = await cloudinary.uploader.upload(localPath, {
            folder: 'gul_products_imported',
          });
          imageUrls.push(result.secure_url);
        } catch (error) {
          console.error(`  Error uploading to Cloudinary:`, error.message);
          uploadSuccess = false;
          break;
        }
      }

      if (!uploadSuccess || imageUrls.length === 0) {
        console.error(`  Failed to upload all images. Skipping product creation.`);
        failCount++;
        continue;
      }

      try {
        const productData = {
          user: adminId,
          name,
          image: imageUrls[0],
          images: imageUrls,
          brand: 'GUL FASHION',
          category: config.category,
          subcategory: config.subcategory || '',
          description: config.description,
          price: config.price,
          originalPrice: config.originalPrice,
          countInStock: Math.floor(Math.random() * 15) + 5,
          sizes: config.sizes || [],
          colors: config.colors || [],
          materials: config.materials || [],
          specifications: config.specifications || [],
          careInstructions: ['Dry clean or gentle hand wash', 'Iron at low temperature'],
          soldOut: false,
          displayOrder: displayOrderCounter++,
        };

        await Product.create(productData);
        console.log(`  Successfully created product in DB: "${name}"`);
        successCount++;
      } catch (dbErr) {
        console.error(`  Error creating product in DB:`, dbErr.message);
        failCount++;
      }
    }

    console.log('\n=== Seeding Finished ===');
    console.log(`Products Processed: ${processedCount}`);
    console.log(`Successfully Seeded: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    
    process.exit(0);
  } catch (error) {
    console.error(`Critical Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
