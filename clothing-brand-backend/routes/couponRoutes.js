import express from 'express';
import Coupon from '../models/Coupon.js';
import { adminOnly } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimit.js';

const router = express.Router();

const validateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: 'Too many coupon attempts. Please try again later.',
});

router.get('/', adminOnly, async (req, res) => {
  const items = await Coupon.find().sort({ createdAt: -1 }).populate('productId');
  res.json(items);
});

router.post('/', adminOnly, async (req, res) => {
  const c = new Coupon(req.body);
  await c.save();
  res.status(201).json(c);
});

router.get('/validate/:code', validateLimiter, async (req, res) => {
  const couponCode = req.params.code.toUpperCase();
  const coupon = await Coupon.findOne({ code: couponCode });
  
  if (!coupon) {
    return res.status(404).json({ error: 'Invalid coupon code' });
  }
  
  if (!coupon.active) {
    return res.status(400).json({ error: 'Coupon is no longer active' });
  }

  // Check usage limit if applicable
  if (coupon.usageLimit && coupon.used >= coupon.usageLimit) {
    return res.status(400).json({ error: 'Coupon usage limit reached' });
  }
  
  // Check expiration if applicable
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return res.status(400).json({ error: 'Coupon has expired' });
  }

  res.json({
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    applicableCategories: coupon.applicableCategories,
    maxPriceThreshold: coupon.maxPriceThreshold,
    maxDiscountAmount: coupon.maxDiscountAmount,
    usageLimit: coupon.usageLimit,
    used: coupon.used
  });
});

router.put('/:code', adminOnly, async (req, res) => {
  const updated = await Coupon.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:code', adminOnly, async (req, res) => {
  await Coupon.findOneAndDelete({ code: req.params.code });
  res.json({ ok: true });
});

export default router;
