// Google Merchant Center sync
// Usage:
//   node merchant_sync.js setup [developer@email.com]   - one-time: link GCP project + create data source
//   node merchant_sync.js sync                          - push all products
//   node merchant_sync.js status                        - approval summary + issues from Google
//   node merchant_sync.js preview                       - print the first product payload (no API call)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import {
  isMerchantConfigured,
  registerGcp,
  ensureDataSource,
  syncAllProducts,
  getMerchantStatus,
  toProductInput,
} from './utils/googleMerchant.js';

dotenv.config();

const [command = 'sync', arg] = process.argv.slice(2);

const run = async () => {
  try {
    if (command !== 'preview' && !isMerchantConfigured()) {
      throw new Error('Set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_SERVICE_ACCOUNT_KEY_FILE in .env first');
    }

    if (command === 'setup') {
      const registration = await registerGcp(arg);
      console.log('GCP registration:', JSON.stringify(registration, null, 2));
      console.log('Data source:', await ensureDataSource());
    } else if (command === 'status') {
      const { merchantId, summary, issues } = await getMerchantStatus();
      console.log(`Merchant ${merchantId}:`, summary);
      for (const issue of issues) {
        console.log(`- [${issue.severity}] ${issue.title} (${issue.offerId}): ${issue.description}${issue.attribute ? ` [${issue.attribute}]` : ''}`);
      }
    } else if (command === 'preview') {
      await mongoose.connect(process.env.MONGO_URI);
      const product = await Product.findOne({}).lean();
      console.log(JSON.stringify(toProductInput(product), null, 2));
    } else if (command === 'sync') {
      await mongoose.connect(process.env.MONGO_URI);
      const products = await Product.find({}).lean();
      console.log(`Syncing ${products.length} products to Google Merchant Center...`);
      const result = await syncAllProducts(products);
      console.log(`Synced: ${result.synced}, Skipped: ${result.skipped.length}, Failed: ${result.failed.length}`);
      result.skipped.forEach((p) => console.log(`  skipped ${p.name} (${p.id}): ${p.reason}`));
      result.failed.forEach((p) => console.log(`  failed  ${p.name} (${p.id}): ${p.error}`));
    } else {
      throw new Error(`Unknown command "${command}". Use setup | sync | status | preview`);
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.details) console.error(JSON.stringify(error.details, null, 2));
    process.exit(1);
  }
};

run();
