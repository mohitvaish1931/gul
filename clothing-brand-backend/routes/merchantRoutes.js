import express from 'express';
import Product from '../models/Product.js';
import {
  isMerchantConfigured,
  registerGcp,
  ensureDataSource,
  syncAllProducts,
  upsertProduct,
  getSkipReason,
  getMerchantStatus,
} from '../utils/googleMerchant.js';

const router = express.Router();

// Admin routes in this app have no auth, so Merchant endpoints require a shared secret
const requireMerchantSecret = (req, res, next) => {
  const secret = process.env.MERCHANT_SYNC_SECRET;
  if (!secret) {
    return res.status(503).json({ message: 'MERCHANT_SYNC_SECRET is not set on the server' });
  }
  if (req.get('x-merchant-secret') !== secret) {
    return res.status(401).json({ message: 'Invalid merchant secret' });
  }
  if (!isMerchantConfigured()) {
    return res.status(503).json({ message: 'Google service account key is not configured' });
  }
  next();
};

router.use(requireMerchantSecret);

// @desc    One-time setup: register GCP project with Merchant Center and create the API data source
// @route   POST /api/merchant/setup  { developerEmail }
router.post('/setup', async (req, res) => {
  try {
    const registration = await registerGcp(req.body.developerEmail);
    const dataSource = await ensureDataSource();
    res.json({ registration, dataSource });
  } catch (error) {
    console.error('Merchant setup error:', error.message);
    res.status(error.status || 500).json({ message: error.message, details: error.details });
  }
});

// @desc    Push all products to Google Merchant Center
// @route   POST /api/merchant/sync
router.post('/sync', async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    const result = await syncAllProducts(products);
    res.json({ total: products.length, ...result });
  } catch (error) {
    console.error('Merchant sync error:', error.message);
    res.status(error.status || 500).json({ message: error.message, details: error.details });
  }
});

// @desc    Push a single product to Google Merchant Center
// @route   POST /api/merchant/sync/:id
router.post('/sync/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const skipReason = getSkipReason(product);
    if (skipReason) return res.status(400).json({ message: `Product skipped: ${skipReason}` });

    const productInput = await upsertProduct(product);
    res.json(productInput);
  } catch (error) {
    console.error('Merchant product sync error:', error.message);
    res.status(error.status || 500).json({ message: error.message, details: error.details });
  }
});

// @desc    Approval summary and item-level issues reported by Google
// @route   GET /api/merchant/status
router.get('/status', async (req, res) => {
  try {
    res.json(await getMerchantStatus());
  } catch (error) {
    console.error('Merchant status error:', error.message);
    res.status(error.status || 500).json({ message: error.message, details: error.details });
  }
});

export default router;
