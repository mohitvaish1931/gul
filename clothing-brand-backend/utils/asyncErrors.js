// Express 4 ignores promises returned by async route handlers, so a thrown error inside one
// becomes an unhandled rejection that crashes the whole Node process. This forwards those
// errors to the error middleware instead (same approach as the express-async-errors package).
import Layer from 'express/lib/router/layer.js';

Layer.prototype.handle_request = function handle(req, res, next) {
  const fn = this.handle;

  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    const result = fn(req, res, next);
    if (result && typeof result.catch === 'function') {
      result.catch(next);
    }
  } catch (err) {
    next(err);
  }
};
