import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Multer & Cloudinary Storage Config for Product Images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gul-products',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

// Helper to safely parse stringified JSON arrays
const parseField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  try {
    return JSON.parse(field);
  } catch (e) {
    return field.split(',').map(s => s.trim()).filter(Boolean);
  }
};

// Simple in-memory cache
const productCache = {
  data: null,
  timestamp: 0,
  TTL: 5 * 60 * 1000 // 5 minutes cache
};

function getCachedProducts() {
  const now = Date.now();
  if (productCache.data && (now - productCache.timestamp) < productCache.TTL) {
    return productCache.data;
  }
  return null;
}

function setCachedProducts(data) {
  productCache.data = data;
  productCache.timestamp = Date.now();
}

// @desc    Fetch all products with pagination
// @route   GET /api/products?page=1&limit=20&category=tops
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20); // Max 100 per page
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.category) {
      query.category = req.query.category;
    } else if (req.query.keyword) {
      query = {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { category: { $regex: req.query.keyword, $options: 'i' } }
        ],
      };
    }

    // Check cache for homepage products (no filters)
    let products = null;
    let total = 0;
    
    if (!req.query.keyword && !req.query.category) {
      const cached = getCachedProducts();
      if (cached) {
        products = cached.slice(skip, skip + limit);
        total = cached.length;
      }
    }

    if (!products) {
      // Query only needed fields for list view (reduce network payload)
      const selectFields = page === 1 && limit === 20 
        ? 'name price originalPrice image category brand soldOut showOnHomepage displayOrder _id'
        : 'name price originalPrice image category brand soldOut showOnHomepage displayOrder _id images description';
      
      products = await Product.find(query)
        .select(selectFields)
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean() // Use lean() for faster query execution
        .skip(skip)
        .limit(limit);

      total = await Product.countDocuments(query);

      // Cache full product list if no filters
      if (!req.query.keyword && !req.query.category && page === 1) {
        const allProducts = await Product.find({})
          .sort({ displayOrder: 1, createdAt: -1 })
          .lean();
        setCachedProducts(allProducts);
      }
    }

    res.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
      limit
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ message: 'Server Error: unable to fetch products' });
  }
});

// Clear cache on product changes
function invalidateCache() {
  productCache.data = null;
  productCache.timestamp = 0;
}

// @desc    Fetch single product
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Invalid ID format' });
  }
});

// @desc    Create new product
// @route   POST /api/products
router.post('/', upload.array('image', 10), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(f => f.secure_url || f.url || f.path) : [];
    
    const parsedSizes = parseField(req.body.sizes);
    const parsedColors = parseField(req.body.colors);
    const parsedMaterials = parseField(req.body.materials);
    const parsedSpecifications = parseField(req.body.specifications);
    const parsedCareInstructions = parseField(req.body.careInstructions);
    const parsedVideos = parseField(req.body.videos);

    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price || 0),
      originalPrice: Number(req.body.originalPrice || 0),
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand || 'GUL FASHION',
      countInStock: Number(req.body.stock || req.body.countInStock || 0),
      stock: Number(req.body.stock || req.body.countInStock || 0),
      image: imageUrls[0] || '/images/placeholder.png',
      images: imageUrls,
      sizes: parsedSizes,
      colors: parsedColors,
      materials: parsedMaterials,
      specifications: parsedSpecifications,
      careInstructions: parsedCareInstructions,
      videos: parsedVideos,
      soldOut: req.body.soldOut === 'true' || req.body.soldOut === true,
      showOnHomepage: req.body.showOnHomepage !== undefined ? (req.body.showOnHomepage === 'true' || req.body.showOnHomepage === true) : true,
      isBOGO: req.body.isBOGO === 'true' || req.body.isBOGO === true,
    });

    const createdProduct = await product.save();
    invalidateCache(); // Clear cache after product creation
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server Error: unable to create product', error: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
router.put('/:id', upload.array('image', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      // New uploaded images from Cloudinary
      const newUploadedUrls = req.files ? req.files.map(f => f.secure_url || f.url || f.path) : [];
      
      // Existing images that user chose to keep (may have deleted some)
      const existingImages = req.body.existing_images ? parseField(req.body.existing_images) : [];
      
      // Merge: kept existing images + newly uploaded images
      let imageUrls = [...existingImages, ...newUploadedUrls];
      
      // Fallback to current images if nothing was sent
      if (imageUrls.length === 0) {
        imageUrls = product.images && product.images.length > 0 ? product.images : [product.image];
      }

      product.name = req.body.name || product.name;
      product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
      product.originalPrice = req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : product.originalPrice;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      
      const newStock = req.body.stock !== undefined ? Number(req.body.stock) : (req.body.countInStock !== undefined ? Number(req.body.countInStock) : product.stock);
      product.stock = newStock;
      product.countInStock = newStock;

      product.images = imageUrls;
      product.image = imageUrls[0] || product.image;

      if (req.body.sizes) product.sizes = parseField(req.body.sizes);
      if (req.body.colors) product.colors = parseField(req.body.colors);
      if (req.body.materials) product.materials = parseField(req.body.materials);
      if (req.body.specifications) product.specifications = parseField(req.body.specifications);
      if (req.body.careInstructions) product.careInstructions = parseField(req.body.careInstructions);
      if (req.body.videos) product.videos = parseField(req.body.videos);

      if (req.body.soldOut !== undefined) {
        product.soldOut = req.body.soldOut === 'true' || req.body.soldOut === true;
      }
      if (req.body.showOnHomepage !== undefined) {
        product.showOnHomepage = req.body.showOnHomepage === 'true' || req.body.showOnHomepage === true;
      }
      if (req.body.isBOGO !== undefined) {
        product.isBOGO = req.body.isBOGO === 'true' || req.body.isBOGO === true;
      }

      const updatedProduct = await product.save();
      invalidateCache(); // Clear cache after product update
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server Error: unable to update product', error: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      invalidateCache(); // Clear cache after product deletion
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server Error: unable to delete product', error: error.message });
  }
});

// @desc    Reorder products displayOrder
// @route   POST /api/products/reorder
router.post('/reorder', async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const bulkOps = products.map(p => ({
      updateOne: {
        filter: { _id: p.id },
        update: { $set: { displayOrder: p.displayOrder } }
      }
    }));

    await Product.bulkWrite(bulkOps);
    invalidateCache(); // Clear cache after reordering
    res.json({ success: true, message: 'Products reordered successfully' });
  } catch (error) {
    console.error('Reorder error:', error);
    res.status(500).json({ message: 'Server Error: unable to reorder products', error: error.message });
  }
});

export default router;
