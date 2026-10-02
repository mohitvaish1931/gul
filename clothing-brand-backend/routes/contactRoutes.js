import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { adminOnly } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { sendMailInBackground, getStoreEmail } from '../utils/mailer.js';
import { contactOwnerEmail } from '../utils/emailTemplates.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many messages. Please try again later or WhatsApp us.',
});

const clean = (value, max) => String(value || '').trim().slice(0, max);

// @desc    Contact form submission
// @route   POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  const message = {
    name: clean(req.body.name, 120),
    email: clean(req.body.email, 200),
    phone: clean(req.body.phone, 30),
    subject: clean(req.body.subject, 200),
    message: clean(req.body.message, 5000),
  };

  if (!message.name || !message.message || !/^\S+@\S+\.\S+$/.test(message.email)) {
    return res.status(400).json({ message: 'Please enter your name, a valid email and a message.' });
  }

  const saved = await ContactMessage.create(message);
  sendMailInBackground({ to: getStoreEmail(), replyTo: message.email, ...contactOwnerEmail(message) });

  res.status(201).json({ success: true, id: saved._id });
});

// @desc    All contact messages
// @route   GET /api/contact
router.get('/', adminOnly, async (req, res) => {
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).limit(500);
  res.json(messages);
});

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
router.put('/:id/read', adminOnly, async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
  if (!message) return res.status(404).json({ message: 'Message not found' });
  res.json(message);
});

// @desc    Delete a message
// @route   DELETE /api/contact/:id
router.delete('/:id', adminOnly, async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
