import express from 'express';
import Video from '../models/Video.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'moyaa-videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'webm', 'mov', 'avi', 'mkv'],
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Video.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('GET /api/videos error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Accept multipart form with optional file field 'file' or JSON body { title, url }
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const body = { ...(req.body || {}) };
    if (req.file) {
      body.url = req.file.secure_url || req.file.url || req.file.path;
      body.title = body.title || req.file.originalname;
    }
    const v = new Video(body);
    await v.save();
    res.status(201).json(v);
  } catch (err) {
    console.error('POST /api/videos error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/videos/:id error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
