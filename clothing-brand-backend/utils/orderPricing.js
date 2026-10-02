import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';

const DEFAULT_MAX_DISCOUNT = 800;

const httpError = (status, message) => Object.assign(new Error(message), { status });

// Same rules as GET /api/coupons/validate/:code
export async function findValidCoupon(code) {
  const coupon = await Coupon.findOne({ code: String(code).toUpperCase() });
  if (!coupon) throw httpError(400, 'Invalid coupon code');
  if (!coupon.active) throw httpError(400, 'Coupon is no longer active');
  if (coupon.usageLimit && coupon.used >= coupon.usageLimit) throw httpError(400, 'Coupon usage limit reached');
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) throw httpError(400, 'Coupon has expired');
  return coupon;
}

// Mirrors calculateDiscountAmount() in CartScreen.tsx
function calculateDiscount(items, coupon) {
  let eligibleSubtotal = 0;
  for (const item of items) {
    if (coupon.applicableCategories?.length && !coupon.applicableCategories.includes(item.category)) continue;
    if (coupon.maxPriceThreshold !== null && coupon.maxPriceThreshold !== undefined && item.price > coupon.maxPriceThreshold) continue;
    eligibleSubtotal += item.qty * item.price;
  }
  const discount = Math.round((eligibleSubtotal * (coupon.discountPercent || 0)) / 100);
  return Math.min(discount, coupon.maxDiscountAmount || DEFAULT_MAX_DISCOUNT);
}

// Builds order items and totals from database prices so the client can't change what it pays
export async function priceOrder(orderItems, couponCode) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) throw httpError(400, 'No order items');

  const ids = orderItems.map((item) => item.product || item._id || item.id);
  const products = await Product.find({ _id: { $in: ids } }).lean();
  const productMap = new Map(products.map((p) => [String(p._id), p]));

  const items = orderItems.map((item, index) => {
    const product = productMap.get(String(ids[index]));
    if (!product) throw httpError(400, `Product not found: ${item.name || ids[index]}`);
    if (product.soldOut || Number(product.countInStock) <= 0) throw httpError(400, `${product.name} is out of stock`);

    const qty = Math.floor(Number(item.qty) || 1);
    if (qty < 1 || qty > 50) throw httpError(400, `Invalid quantity for ${product.name}`);

    return {
      name: product.name,
      qty,
      image: product.image,
      price: product.price,
      category: product.category,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      product: product._id,
    };
  });

  const itemsPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  let discountAmount = 0;
  let appliedCouponCode = null;
  if (couponCode) {
    const coupon = await findValidCoupon(couponCode);
    discountAmount = calculateDiscount(items, coupon);
    appliedCouponCode = coupon.code;
  }

  return {
    orderItems: items.map(({ category, ...rest }) => rest),
    itemsPrice,
    discountAmount,
    couponCode: appliedCouponCode,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: Math.max(0, itemsPrice - discountAmount),
  };
}
