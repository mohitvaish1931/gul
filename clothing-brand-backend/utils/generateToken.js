import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'fallbacksecret123', {
    expiresIn: '30d',
  });

  // Set JWT as HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Required for sameSite: 'none'
    sameSite: 'none', // Required for cross-domain cookies (Vercel to Render)
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
