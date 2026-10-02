import express from 'express';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { rateLimit } from '../middleware/rateLimit.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please try again in 15 minutes.',
});
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many accounts created. Please try again later.',
});

const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
  token: generateToken(user._id),
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json(userResponse(user));
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post('/', registerLimiter, async (req, res) => {
  const { name, email, password } = req.body;

  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const user = await User.create({
    name: name.trim(),
    email: email.trim(),
    password,
  });

  res.status(201).json(userResponse(user));
});

// @desc    Logout user (tokens live in the browser, so there is nothing to clear here)
// @route   POST /api/users/logout
// @access  Public
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

// @desc    Get all users
// @route   GET /api/users
// @access  Admin
router.get('/', adminOnly, async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

export default router;
