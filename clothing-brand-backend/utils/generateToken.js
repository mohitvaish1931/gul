import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallbacksecret123', {
    expiresIn: '30d',
  });

  const isProd = process.env.NODE_ENV === 'production';
  const sameSiteMode = process.env.COOKIE_SAME_SITE || (isProd ? 'none' : 'lax');
  const isSecure = process.env.COOKIE_SECURE === 'true' || isProd;

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSiteMode,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
