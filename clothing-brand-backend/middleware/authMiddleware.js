import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getJwtSecret } from '../utils/generateToken.js';

const readToken = (req) => {
  const header = req.get('authorization') || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null;
};

// Requires a valid login token (sent as `Authorization: Bearer <token>`)
export const protect = async (req, res, next) => {
  const token = readToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Please log in to continue' });
  }

  let payload;
  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch (error) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }

  const user = await User.findById(payload.userId).select('-password');
  if (!user) {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }

  req.user = user;
  next();
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Admin access required' });
};

export const adminOnly = [protect, admin];

// True when the logged-in user owns the record or is an admin
export const canAccess = (req, ownerId) =>
  Boolean(req.user && (req.user.isAdmin || String(ownerId?._id || ownerId) === String(req.user._id)));
