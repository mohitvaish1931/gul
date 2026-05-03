import express from 'express';
import { protect as requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/chat - Send a chat message
router.post('/', requireAuth, async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Authorization check: Verify the userId matches the authenticated user
    if (userId !== req.user.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'You can only send messages with your own user ID'
      });
    }

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Process the chat message here
    // TODO: Save to database, integrate with chat service, etc.

    res.json({
      success: true,
      message: 'Chat message processed',
      userId: req.user.id,
      userEmail: req.user.email
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/chat/:chatId - Get chat messages
router.get('/:chatId', requireAuth, async (req, res) => {
  try {
    const { chatId } = req.params;

    // Add authorization check for viewing chat
    // Verify that the user has access to this chat
    // TODO: Check if chat belongs to req.user.id

    res.json({
      success: true,
      chatId,
      userId: req.user.id,
      messages: []
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
