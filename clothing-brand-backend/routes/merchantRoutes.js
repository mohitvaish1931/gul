import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  isMerchantConfigured,
  getMerchantConfig,
  registerGcp,
  ensureDataSource,
  upsertProduct,
  getSkipReason,
  getMerchantStatus,
  startFullSync,
  getSyncState,
} from '../utils/googleMerchant.js';

const router = express.Router();

export const loadAllProducts = () => Product.find({}).lean();

// Logged-in admins use these routes from the admin panel. Scripts and cron jobs can
// instead send the shared MERCHANT_SYNC_SECRET as the X-Merchant-Secret header.
const requireAdminOrSecret = (req, res, next) => {
  const secret = process.env.MERCHANT_SYNC_SECRET;
  if (secret && req.get('x-merchant-secret') === secret) return next();
  return protect(req, res, () => admin(req, res, next));
};

const requireKey = (req, res, next) => {
  if (!isMerchantConfigured()) {
    return res.status(503).json({ message: 'Add the Google service account key on the server first (GOOGLE_SERVICE_ACCOUNT_KEY).' });
  }
  next();
};

const sendError = (res, error, label) => {
  console.error(`${label}:`, error.message);
  res.status(error.status && error.status < 600 ? error.status : 500).json({ message: error.message, details: error.details });
};

router.use(requireAdminOrSecret);

// @desc    Setup progress for the admin panel (works before the key is added)
// @route   GET /api/merchant/config
router.get('/config', (req, res) => {
  res.json({ ...getMerchantConfig(), sync: getSyncState() });
});

// @desc    One-time setup: register the Google Cloud project with Merchant Center and create the API data source
// @route   POST /api/merchant/setup  { developerEmail }
router.post('/setup', requireKey, async (req, res) => {
  try {
    const developerEmail = String(req.body.developerEmail || '').trim();
    let registration;
    try {
      registration = await registerGcp(developerEmail || undefined);
    } catch (error) {
      // Already registered is fine - carry on to the data source
      if (!/already/i.test(error.message)) throw error;
      registration = { alreadyRegistered: true };
    }
    const dataSource = await ensureDataSource();
    res.json({ registration, dataSource });
  } catch (error) {
    sendError(res, error, 'Merchant setup error');
  }
});

// @desc    Start a full sync of all products (runs in the background)
// @route   POST /api/merchant/sync
router.post('/sync', requireKey, (req, res) => {
  const started = startFullSync(loadAllProducts, 'manual');
  res.status(started ? 202 : 409).json({ started, sync: getSyncState() });
});

// @desc    Progress / result of the current or last full sync
// @route   GET /api/merchant/sync
router.get('/sync', (req, res) => {
  res.json(getSyncState());
});

// @desc    Push a single product to Google Merchant Center
// @route   POST /api/merchant/sync/:id
router.post('/sync/:id', requireKey, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const skipReason = getSkipReason(product);
    if (skipReason) return res.status(400).json({ message: `Product skipped: ${skipReason}` });

    res.json(await upsertProduct(product));
  } catch (error) {
    sendError(res, error, 'Merchant product sync error');
  }
});

// @desc    Approval summary and item-level issues reported by Google
// @route   GET /api/merchant/status
router.get('/status', requireKey, async (req, res) => {
  try {
    res.json(await getMerchantStatus());
  } catch (error) {
    sendError(res, error, 'Merchant status error');
  }
});

export default router;
