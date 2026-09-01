const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'clothing-brand-frontend/src/context/AppContext.tsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Change quantity to qty in CartItem
content = content.replace(/quantity: number;/g, 'qty: number;');

// 2. Add SET_CART to AppAction
content = content.replace(
  /\| \{ type: 'UPDATE_ORDER'; payload: any \};/,
  `| { type: 'UPDATE_ORDER'; payload: any }
  | { type: 'SET_CART'; payload: CartItem[] };`
);
content = content.replace(
  /\| \{ type: 'ADD_TO_CART'; payload: Product \}/,
  `| { type: 'ADD_TO_CART'; payload: Product & { qty?: number } }`
);

// 3. Update REMOVE_FROM_CART and UPDATE_CART_QUANTITY payload signatures
content = content.replace(
  /\| \{ type: 'UPDATE_CART_QUANTITY'; payload: \{ id: string \| number; quantity: number \} \}/,
  `| { type: 'UPDATE_CART_QUANTITY'; payload: { id: string | number; qty: number; selectedSize?: string; selectedColor?: string } }`
);
content = content.replace(
  /\| \{ type: 'REMOVE_FROM_CART'; payload: string \| number \}/,
  `| { type: 'REMOVE_FROM_CART'; payload: { id: string | number; selectedSize?: string; selectedColor?: string } }`
);

// 4. Implement cart persistence synchronously in initialState
content = content.replace(
  /const initialState: AppState = \{[\s\S]*?orders: \[\],\n\};/,
  `const getInitialCart = () => {
  try {
    const rawCart = localStorage.getItem('rr_cart');
    if (rawCart) return JSON.parse(rawCart) || [];
  } catch(e) {}
  return [];
};

const getInitialUser = () => {
  try {
    const rawUser = localStorage.getItem('rr_user');
    if (rawUser) return JSON.parse(rawUser);
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

// 5. Replace ADD_TO_CART logic
content = content.replace(
  /case 'ADD_TO_CART':[\s\S]*?case 'REMOVE_FROM_CART':/,
  `case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'ADD_TO_CART':
      const existingCartItemIndex = state.cart.findIndex(
        item => item.id === action.payload.id && 
                item.selectedSize === action.payload.selectedSize && 
                item.selectedColor === action.payload.selectedColor
      );
      if (existingCartItemIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingCartItemIndex] = {
          ...newCart[existingCartItemIndex],
          qty: newCart[existingCartItemIndex].qty + (action.payload.qty || 1)
        };
        return { ...state, cart: newCart };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: action.payload.qty || 1 }],
      };
    
    case 'REMOVE_FROM_CART':`
);

// 6. Replace REMOVE_FROM_CART and UPDATE_CART_QUANTITY logic
content = content.replace(
  /case 'REMOVE_FROM_CART':[\s\S]*?case 'UPDATE_CART_SHAPE':/,
  `case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.id && 
            item.selectedSize === action.payload.selectedSize && 
            item.selectedColor === action.payload.selectedColor)
        ),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && 
          item.selectedSize === action.payload.selectedSize && 
          item.selectedColor === action.payload.selectedColor
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    
    case 'UPDATE_CART_SHAPE':`
);

// 7. Add rr_cart save to useEffect
content = content.replace(
  /\/\/ Only persist user to localStorage, NOT products\/videos\/banners\/coupons[\s\S]*?\}, \[state\.user\]\);/,
  `// Persist user and cart to localStorage
  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem('rr_user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('rr_user');
      }
    } catch (e) {
      // ignore
    }
  }, [state.user]);

  useEffect(() => {
    try {
      localStorage.setItem('rr_cart', JSON.stringify(state.cart));
    } catch (e) {
      // ignore
    }
  }, [state.cart]);`
);

// 8. Remove hydration of user from hydrate (since it's now synchronous)
content = content.replace(
  /\/\/ Restore user from localStorage[\s\S]*?\/\/ Try to fetch from MongoDB backend/,
  `// Try to fetch from MongoDB backend`
);

fs.writeFileSync(file, content);
console.log('Fixed');
