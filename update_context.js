const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'clothing-brand-frontend/src/context/AppContext.tsx');
let content = fs.readFileSync(file, 'utf8');

// Add SET_CART to AppAction
content = content.replace(
  /\| \{ type: 'UPDATE_ORDER'; payload: any \};/,
  `| { type: 'UPDATE_ORDER'; payload: any }
  | { type: 'SET_CART'; payload: CartItem[] };`
);

// Add SET_CART to reducer
content = content.replace(
  /case 'ADD_TO_CART':/,
  `case 'SET_CART':
      return { ...state, cart: action.payload };
    
    case 'ADD_TO_CART':`
);


// Change quantity to qty in CartItem
content = content.replace(/quantity: number;/g, 'qty: number;');

// Update ADD_TO_CART reducer
content = content.replace(
  /case 'ADD_TO_CART':[\s\S]*?case 'REMOVE_FROM_CART':/,
  `case 'ADD_TO_CART':
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

// Update UPDATE_CART_QUANTITY reducer
content = content.replace(
  /case 'UPDATE_CART_QUANTITY':[\s\S]*?case 'UPDATE_CART_SHAPE':/,
  `case 'UPDATE_CART_QUANTITY':
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
// Also update AppAction type
content = content.replace(
  /\| \{ type: 'UPDATE_CART_QUANTITY'; payload: \{ id: string \| number; quantity: number \} \}/,
  `| { type: 'UPDATE_CART_QUANTITY'; payload: { id: string | number; qty: number; selectedSize?: string; selectedColor?: string } }`
);
content = content.replace(
  /\| \{ type: 'REMOVE_FROM_CART'; payload: string \| number \}/,
  `| { type: 'REMOVE_FROM_CART'; payload: { id: string | number; selectedSize?: string; selectedColor?: string } }`
);

// Update REMOVE_FROM_CART reducer logic
content = content.replace(
  /case 'REMOVE_FROM_CART':[\s\S]*?case 'UPDATE_CART_QUANTITY':/,
  `case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => 
          !(item.id === action.payload.id && 
            item.selectedSize === action.payload.selectedSize && 
            item.selectedColor === action.payload.selectedColor)
        ),
      };
    
    case 'UPDATE_CART_QUANTITY':`
);

// Add localStorage saving for cart
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

// Add cart hydrate
content = content.replace(
  /try \{\s*const rawUser = localStorage.getItem\('rr_user'\);/,
  `try {
        const rawCart = localStorage.getItem('rr_cart');
        if (rawCart && mounted) {
           const parsedCart = JSON.parse(rawCart);
           if(parsedCart && parsedCart.length > 0) {
             dispatch({ type: 'SET_CART', payload: parsedCart });
           }
        }
        
        const rawUser = localStorage.getItem('rr_user');`
);

fs.writeFileSync(file, content);
console.log('Done');
