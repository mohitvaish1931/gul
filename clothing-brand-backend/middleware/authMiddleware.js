import User from '../models/User.js';

// No JWT - just pass through. If user info is needed, find admin user.
export const protect = async (req, res, next) => {
  try {
    // Find the admin user and attach to request
    const adminUser = await User.findOne({ isAdmin: true }).select('-password');
    if (adminUser) {
      req.user = adminUser;
    }
    next();
  } catch (error) {
    next();
  }
};

// Admin check - pass through (no JWT auth needed)
export const admin = (req, res, next) => {
  next();
};
