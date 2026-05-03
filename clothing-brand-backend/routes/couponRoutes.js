import express from 'express';
import Coupon from '../models/Coupon.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const items = await Coupon.find().sort({ createdAt: -1 }).populate('productId');
  res.json(items);
});

router.post('/', async (req, res) => {
  const c = new Coupon(req.body);
  await c.save();
  res.status(201).json(c);
});

router.put('/:code', async (req, res) => {
  const updated = await Coupon.findOneAndUpdate({ code: req.params.code }, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

router.delete('/:code', async (req, res) => {
  await Coupon.findOneAndDelete({ code: req.params.code });
  res.json({ ok: true });
});

export default router;
