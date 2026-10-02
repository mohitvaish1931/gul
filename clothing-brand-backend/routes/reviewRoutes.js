import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { protect, adminOnly, canAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Recalculate a product's rating from its approved reviews
async function updateProductRating(productId) {
  const approved = await Review.find({ productId, status: 'approved' }).select('rating');
  const count = approved.length;
  const average = count ? Math.round((approved.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10 : 0;
  await Product.findByIdAndUpdate(productId, {
    rating: average,
    numReviews: count,
    averageRating: average,
    reviewCount: count,
  });
}

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { sort = 'newest', rating } = req.query;
    let query = { productId: req.params.productId, status: 'approved' };

    if (rating) {
      query.rating = parseInt(rating);
    }

    // Reviewer emails are private
    let reviews = await Review.find(query)
      .select('-updatedAt -userEmail')
      .populate('userId', 'name');

    // Sort reviews
    if (sort === 'helpful') {
      reviews.sort((a, b) => b.helpful - a.helpful);
    } else if (sort === 'highest') {
      reviews.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'lowest') {
      reviews.sort((a, b) => a.rating - b.rating);
    } else {
      // Default: newest
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Get rating distribution
    const allReviews = await Review.find({ productId: req.params.productId, status: 'approved' });
    const ratingDistribution = {
      5: allReviews.filter(r => r.rating === 5).length,
      4: allReviews.filter(r => r.rating === 4).length,
      3: allReviews.filter(r => r.rating === 3).length,
      2: allReviews.filter(r => r.rating === 2).length,
      1: allReviews.filter(r => r.rating === 1).length
    };

    res.json({
      reviews,
      totalReviews: allReviews.length,
      ratingDistribution
    });
  } catch (err) {
    console.error('GET /api/reviews/product/:productId error:', err.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Get pending reviews (admin only)
router.get('/admin/pending', adminOnly, async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'pending' })
      .populate('productId', 'name image')
      .sort({ createdAt: -1 });

    res.json({
      count: reviews.length,
      reviews
    });
  } catch (err) {
    console.error('GET /api/reviews/admin/pending error:', err.message);
    res.status(500).json({ error: 'Failed to fetch pending reviews' });
  }
});

// Approve review (admin only)
router.put('/admin/:id/approve', adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: 'Review not found' });

    await updateProductRating(review.productId);

    res.json({
      message: 'Review approved',
      review
    });
  } catch (err) {
    console.error('PUT /api/reviews/admin/:id/approve error:', err.message);
    res.status(500).json({ error: 'Failed to approve review' });
  }
});

// Reject review (admin only)
router.put('/admin/:id/reject', adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: 'Review not found' });

    await updateProductRating(review.productId);

    res.json({
      message: 'Review rejected',
      review
    });
  } catch (err) {
    console.error('PUT /api/reviews/admin/:id/reject error:', err.message);
    res.status(500).json({ error: 'Failed to reject review' });
  }
});

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).select('-userEmail');
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    console.error('GET /api/reviews/:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Create a review (logged-in users)
router.post('/', protect, async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || !title || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ productId, userId: req.user._id });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = new Review({
      productId,
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      rating,
      title,
      comment,
      status: 'pending' // Reviews need admin approval
    });

    await review.save();

    res.status(201).json({
      message: 'Review submitted successfully. Awaiting approval.',
      review
    });
  } catch (err) {
    console.error('POST /api/reviews error:', err.message);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Update a review (author or admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || !canAccess(req, review.userId)) return res.status(404).json({ error: 'Review not found' });

    const { rating, title, comment } = req.body;
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    review.status = 'pending'; // Re-submit for approval after edit

    await review.save();
    await updateProductRating(review.productId);

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch (err) {
    console.error('PUT /api/reviews/:id error:', err.message);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review (author or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || !canAccess(req, review.userId)) return res.status(404).json({ error: 'Review not found' });

    await Review.findByIdAndDelete(req.params.id);
    await updateProductRating(review.productId);

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/reviews/:id error:', err.message);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// Mark review as helpful
router.put('/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: 'Review not found' });

    res.json({
      message: 'Thank you for your feedback',
      helpful: review.helpful
    });
  } catch (err) {
    console.error('PUT /api/reviews/:id/helpful error:', err.message);
    res.status(500).json({ error: 'Failed to mark review as helpful' });
  }
});

export default router;
