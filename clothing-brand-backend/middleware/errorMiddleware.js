const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Missing or invalid fields
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors || {}).map((e) => e.message).join(', ') || 'Invalid data';
    statusCode = 400;
  }

  if (statusCode >= 500) {
    console.error(`${req.method} ${req.originalUrl} error:`, err);
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };
