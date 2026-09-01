const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'clothing-brand-frontend/src/context/AppContext.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace initialState definition
content = content.replace(
  /const initialState: AppState = \{[\s\S]*?orders: \[\],\s*\};/,
  `const getInitialCart = () => {
  try {
    const rawCart = localStorage.getItem('rr_cart');
    if (rawCart) {
      const parsed = JSON.parse(rawCart);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch(e) {}
  return [];
};

const getInitialUser = () => {
  try {
    const rawUser = localStorage.getItem('rr_user');
    if (rawUser) {
      return JSON.parse(rawUser);
    }
  } catch(e) {}
  return null;
};

const initialState: AppState = {
  user: getInitialUser(),
  cart: getInitialCart(),
  wishlist: [],
  isSignInOpen: false,
  searchQuery: '',
  searchResults: [],
  isSearchOpen: false,
  products: [],
  videos: [],
  banners: [],
  coupons: [],
  orders: [],
};`
);

// Remove the cart hydration from useEffect
content = content.replace(
  /try \{\s*const rawCart = localStorage\.getItem\('rr_cart'\);[\s\S]*?\}\s*const rawUser = localStorage\.getItem\('rr_user'\);/,
  `const rawUser = localStorage.getItem('rr_user');`
);

fs.writeFileSync(file, content);
console.log('Fixed AppContext');
