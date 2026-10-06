// Shopping events for Google Tag Manager, in the GA4 ecommerce format.
// GTM (GTM-5BW8QD4W in index.html) forwards them to Google Analytics / Google Ads.
// item_id is the product's _id, the same ID Google Merchant Center uses, so ads
// and Shopping listings can be matched to sales.

interface TrackedProduct {
  _id?: string;
  id?: string | number;
  name: string;
  price: number;
  category?: string;
  selectedSize?: string;
  selectedColor?: string;
  qty?: number;
}

const CURRENCY = 'INR';

const toItem = (product: TrackedProduct, quantity = product.qty || 1) => {
  const variant = [product.selectedSize, product.selectedColor].filter(Boolean).join(' / ');
  return {
    item_id: String(product._id || product.id),
    item_name: product.name,
    item_brand: 'Gul Fashion',
    ...(product.category ? { item_category: product.category } : {}),
    ...(variant ? { item_variant: variant } : {}),
    price: Number(product.price) || 0,
    quantity,
  };
};

const cartValue = (items: TrackedProduct[]) =>
  items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.qty || 1), 0);

function pushEvent(event: string, ecommerce: Record<string, unknown>) {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    // Clear the previous ecommerce object so values don't leak between events
    w.dataLayer.push({ ecommerce: null });
    w.dataLayer.push({ event, ecommerce });
  } catch {
    // Tracking must never break shopping
  }
}

export const trackViewItem = (product: TrackedProduct) =>
  pushEvent('view_item', { currency: CURRENCY, value: Number(product.price) || 0, items: [toItem(product, 1)] });

export const trackAddToCart = (product: TrackedProduct, quantity: number) =>
  pushEvent('add_to_cart', { currency: CURRENCY, value: (Number(product.price) || 0) * quantity, items: [toItem(product, quantity)] });

export const trackRemoveFromCart = (item: TrackedProduct) =>
  pushEvent('remove_from_cart', { currency: CURRENCY, value: cartValue([item]), items: [toItem(item)] });

export const trackViewCart = (items: TrackedProduct[]) =>
  pushEvent('view_cart', { currency: CURRENCY, value: cartValue(items), items: items.map((item) => toItem(item)) });

export const trackBeginCheckout = (items: TrackedProduct[], value: number, coupon?: string) =>
  pushEvent('begin_checkout', { currency: CURRENCY, value, ...(coupon ? { coupon } : {}), items: items.map((item) => toItem(item)) });

export const trackAddShippingInfo = (items: TrackedProduct[], value: number, coupon?: string) =>
  pushEvent('add_shipping_info', { currency: CURRENCY, value, shipping_tier: 'Free shipping', ...(coupon ? { coupon } : {}), items: items.map((item) => toItem(item)) });

export const trackPurchase = (orderId: string, items: TrackedProduct[], value: number, coupon?: string) =>
  pushEvent('purchase', {
    transaction_id: orderId,
    currency: CURRENCY,
    value,
    shipping: 0,
    tax: 0,
    ...(coupon ? { coupon } : {}),
    items: items.map((item) => toItem(item)),
  });
