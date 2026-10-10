import crypto from 'crypto';
import { canAccess } from '../middleware/authMiddleware.js';

// Every new order gets a random checkout token that only the buyer's browser receives.
// It lets a guest (or a customer whose login expired mid-payment) pay for the order and
// open its confirmation page. Only a hash of it is stored.

const hashToken = (token) => crypto.createHash('sha256').update(String(token)).digest('hex');

export const newCheckoutToken = () => {
  const token = crypto.randomBytes(24).toString('hex');
  return { token, hash: hashToken(token) };
};

const tokenFrom = (req) => req.get('x-order-token') || req.body?.checkout_token || null;

// The logged-in owner, an admin, or whoever holds the order's checkout token
export const canAccessOrder = (req, order) => {
  if (canAccess(req, order.user)) return true;
  const token = tokenFrom(req);
  if (!token || !order.checkoutTokenHash) return false;
  const given = Buffer.from(hashToken(token));
  const stored = Buffer.from(order.checkoutTokenHash);
  return given.length === stored.length && crypto.timingSafeEqual(given, stored);
};

// Indian mobile numbers: 10 digits starting 6-9, optionally written with +91 or a leading 0
export const normalizePhone = (value) => {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks the delivery details and returns a cleaned copy, or a message for the customer.
// The phone number is required; email is optional.
export function cleanShippingAddress(address = {}) {
  const text = (value, max) => String(value || '').trim().slice(0, max);
  const cleaned = {
    name: text(address.name, 80),
    phoneNumber: normalizePhone(address.phoneNumber),
    email: text(address.email, 120).toLowerCase(),
    address: text(address.address, 300),
    city: text(address.city, 60),
    postalCode: text(address.postalCode, 6),
    country: 'India',
  };

  if (!cleaned.name) return { error: 'Please enter your name.' };
  if (!cleaned.phoneNumber) return { error: 'Please enter a valid 10-digit mobile number.' };
  if (cleaned.email && !EMAIL.test(cleaned.email)) return { error: 'Please check the email address, or leave it empty.' };
  if (cleaned.address.length < 5) return { error: 'Please enter your full address.' };
  if (!cleaned.city) return { error: 'Please enter your city.' };
  if (!/^[1-9]\d{5}$/.test(cleaned.postalCode)) return { error: 'Please enter a valid 6-digit pincode.' };
  if (!cleaned.email) delete cleaned.email;
  return { address: cleaned };
}
