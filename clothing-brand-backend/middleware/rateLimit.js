// Small in-memory rate limiter (per IP). Good enough for a single server instance.
export const rateLimit = ({ windowMs, max, message = 'Too many attempts. Please try again later.' }) => {
  const hits = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    let entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count++;

    if (hits.size > 10000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ message });
    }
    next();
  };
};
