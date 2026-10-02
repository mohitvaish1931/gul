import crypto from 'crypto';
import jwt from 'jsonwebtoken';

let temporarySecret;

// JWT_SECRET must be set in production. Without it a random secret is used,
// so tokens stop working (everyone is logged out) whenever the server restarts.
export const getJwtSecret = () => {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (!temporarySecret) {
    temporarySecret = crypto.randomBytes(32).toString('hex');
    console.warn('JWT_SECRET is not set - using a temporary secret. Set JWT_SECRET in the environment.');
  }
  return temporarySecret;
};

const generateToken = (userId) =>
  jwt.sign({ userId: String(userId) }, getJwtSecret(), { expiresIn: '30d' });

export default generateToken;
