import { useSyncExternalStore } from 'react';

// Wishlist and "recently viewed" live in this browser's localStorage (no login needed).

export interface SavedProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category?: string;
}

const WISHLIST_KEY = 'gul_wishlist';
const RECENT_KEY = 'gul_recently_viewed';
const CHANGE_EVENT = 'gul:saved-products';
const MAX_RECENT = 12;

const read = (key: string): SavedProduct[] => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const write = (key: string, items: SavedProduct[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode) - keep working without saving
  }
  cache.delete(key);
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

const toSaved = (product: SavedProduct): SavedProduct => ({
  _id: product._id,
  name: product.name,
  image: product.image,
  price: product.price,
  originalPrice: product.originalPrice,
  category: product.category,
});

// useSyncExternalStore needs a stable snapshot between changes
const cache = new Map<string, SavedProduct[]>();
const snapshot = (key: string) => {
  if (!cache.has(key)) cache.set(key, read(key));
  return cache.get(key)!;
};

const subscribe = (onChange: () => void) => {
  const handler = (event: Event) => {
    if (event instanceof StorageEvent) cache.clear();
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
};

export const useWishlist = () => useSyncExternalStore(subscribe, () => snapshot(WISHLIST_KEY));
export const useRecentlyViewed = () => useSyncExternalStore(subscribe, () => snapshot(RECENT_KEY));

export function toggleWishlist(product: SavedProduct) {
  const items = read(WISHLIST_KEY);
  const exists = items.some((p) => p._id === product._id);
  write(WISHLIST_KEY, exists ? items.filter((p) => p._id !== product._id) : [toSaved(product), ...items]);
  return !exists;
}

export function addRecentlyViewed(product: SavedProduct) {
  const items = read(RECENT_KEY).filter((p) => p._id !== product._id);
  write(RECENT_KEY, [toSaved(product), ...items].slice(0, MAX_RECENT));
}
