import express from 'express';
import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { protect as requireAuth, admin as requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { sort = 'newest', rating } = req.query;
    let query = { productId: req.params.productId, status: 'approved' };

    if (rating) {
      query.rating = parseInt(rating);
    }

    let reviews = await Review.find(query)
      .select('-updatedAt')
      .populate('userId', 'name email');

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

// Get single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    console.error('GET /api/reviews/:id error:', err.message);
    res.status(500).json({ error: 'Failed to fetch review' });
  }
});

// Create a review (authenticated users)
router.post('/', requireAuth, async (req, res) => {
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
    const existingReview = await Review.findOne({
      productId,
      userId: req.user.id
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      userName: req.user.name || 'Anonymous',
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

// Update a review (user can update their own review)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own review' });
    }

    const { rating, title, comment } = req.body;
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (comment) review.comment = comment;
    review.status = 'pending'; // Re-submit for approval after edit

    await review.save();

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch (err) {
    console.error('PUT /api/reviews/:id error:', err.message);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// Delete a review (user can delete their own, admin can delete any)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    const isOwnReview = review.userId.toString() === req.user.id;
    if (!isOwnReview && !req.user.isAdmin) {
      return res.status(403).json({ error: 'You can only delete your own review' });
    }

    // Update product rating stats
    const productReviews = await Review.find({
      productId: review.productId,
      status: 'approved'
    });

    if (productReviews.length > 0) {
      const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      await Product.findByIdAndUpdate(review.productId, {
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: productReviews.length - 1
      });
    }

    await Review.findByIdAndDelete(req.params.id);

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

// Get pending reviews (admin only)
router.get('/admin/pending', requireAuth, requireAdmin, async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'pending' })
      .populate('productId', 'name')
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
router.put('/admin/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: 'Review not found' });

    // Update product rating stats
    const productReviews = await Review.find({
      productId: review.productId,
      status: 'approved'
    });

    if (productReviews.length > 0) {
      const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      await Product.findByIdAndUpdate(review.productId, {
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: productReviews.length
      });
    }

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
router.put('/admin/:id/reject', requireAuth, requireAdmin, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );

    if (!review) return res.status(404).json({ error: 'Review not found' });

    res.json({
      message: 'Review rejected',
      review
    });
  } catch (err) {
    console.error('PUT /api/reviews/admin/:id/reject error:', err.message);
    res.status(500).json({ error: 'Failed to reject review' });
  }
});

export default router;
