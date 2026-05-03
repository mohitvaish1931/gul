import { createContext, useContext, useReducer, type ReactNode, useEffect } from 'react';
import { API_ENDPOINTS } from '../utils/api';

export interface Product {
  id: string | number;
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  videos?: string[];
  sale?: boolean;
  soldOut?: boolean;
  category: string;
  subcategory?: string;
  description?: string;
  features?: string[];
  materials?: string[];
  dimensions?: string;
  weight?: string;
  specifications?: string[];
  careInstructions?: string[];
  averageRating?: number;
  reviewCount?: number;
  stock?: number;
  colors?: string[];
  sizes?: string[];
  selectedSize?: string;
  selectedColor?: string;
  shapes?: string[];
  selectedShape?: string;
  productLink?: string;
  status?: 'published' | 'pre-upload';
  displayOrder?: number;
  quantity?: number;
  isBOGO?: boolean;
}

export interface Video {
  id: string;
  title: string;
  url: string;
}

export interface Banner {
  id: string;
  text: string;
  type?: 'info' | 'hot' | 'new' | 'sold-out';
}

export interface Coupon {
  code: string;
  discountPercent: number;
  active: boolean;
  productId?: string | number | null;
  expiresAt?: string | null;
  usageLimit?: number | null;
  used?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface AppState {
  user: User | null;
  cart: CartItem[];
  wishlist: Product[];
  isSignInOpen: boolean;
  searchQuery: string;
  searchResults: Product[];
  isSearchOpen: boolean;
  products: Product[];
  videos: Video[];
  banners: Banner[];
  coupons: Coupon[];
  orders: any[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string | number }
  | { type: 'SET_VIDEOS'; payload: Video[] }
  | { type: 'ADD_VIDEO'; payload: Video }
  | { type: 'REMOVE_VIDEO'; payload: string }
  | { type: 'SET_BANNERS'; payload: Banner[] }
  | { type: 'ADD_BANNER'; payload: Banner }
  | { type: 'UPDATE_BANNER'; payload: Banner }
  | { type: 'REMOVE_BANNER'; payload: string }
  | { type: 'SET_COUPONS'; payload: Coupon[] }
  | { type: 'ADD_COUPON'; payload: Coupon }
  | { type: 'UPDATE_COUPON'; payload: Coupon }
  | { type: 'REMOVE_COUPON'; payload: string }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string | number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string | number; quantity: number } }
  | { type: 'UPDATE_CART_SHAPE'; payload: { id: string | number; shape: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string | number }
  | { type: 'TOGGLE_SIGNIN'; payload?: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: Product[] }
  | { type: 'TOGGLE_SEARCH'; payload?: boolean }
  | { type: 'SET_ORDERS'; payload: any[] }
  | { type: 'UPDATE_ORDER'; payload: any };

const initialState: AppState = {
  user: null,
  cart: [],
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
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return { ...state, products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload) };
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'ADD_VIDEO':
      return { ...state, videos: [...state.videos, action.payload] };
    case 'REMOVE_VIDEO':
      return { ...state, videos: state.videos.filter(v => v.id !== action.payload) };
    case 'SET_BANNERS':
      return { ...state, banners: action.payload };
    case 'ADD_BANNER':
      return { ...state, banners: [...state.banners, action.payload] };
    case 'UPDATE_BANNER':
      return { ...state, banners: state.banners.map(b => b.id === action.payload.id ? action.payload : b) };
    case 'REMOVE_BANNER':
      return { ...state, banners: state.banners.filter(b => b.id !== action.payload) };
    case 'SET_COUPONS':
      return { ...state, coupons: action.payload };
    case 'ADD_COUPON':
      return { ...state, coupons: [...state.coupons, action.payload] };
    case 'UPDATE_COUPON':
      return { ...state, coupons: state.coupons.map(c => c.code === action.payload.code ? action.payload : c) };
    case 'REMOVE_COUPON':
      return { ...state, coupons: state.coupons.filter(c => c.code !== action.payload) };
    
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => item.id === action.payload.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'UPDATE_CART_SHAPE':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, selectedShape: action.payload.shape }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    
    case 'TOGGLE_SIGNIN':
      return {
        ...state,
        isSignInOpen: action.payload !== undefined ? action.payload : !state.isSignInOpen,
      };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        isSearchOpen: action.payload !== undefined ? action.payload : !state.isSearchOpen,
      };
    
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    
    case 'UPDATE_ORDER':
      return { ...state, orders: state.orders.map(o => o._id === action.payload._id ? action.payload : o) };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fetch from MongoDB backend on mount - with seed data fallback
  useEffect(() => {
    let mounted = true;
    const hydrate = async () => {
      // Restore user from localStorage
      try {
        const rawUser = localStorage.getItem('rr_user');
        if (rawUser && mounted) {
          const parsedUser = JSON.parse(rawUser);
          dispatch({ type: 'SET_USER', payload: { id: parsedUser.id, email: parsedUser.email, name: parsedUser.name, isAdmin: parsedUser.isAdmin } });
        }
      } catch (e) {
        // ignore
      }

      // Try to fetch from MongoDB backend
      try {
        const [prodRes, vidRes, banRes, coupRes] = await Promise.all([
          fetch(API_ENDPOINTS.PRODUCTS),
          fetch(API_ENDPOINTS.VIDEOS),
          fetch(API_ENDPOINTS.BANNERS),
          fetch(API_ENDPOINTS.COUPONS),
        ]);
        
        let hasBackendData = false;
        
        if (prodRes.ok) {
          const prods = await prodRes.json();
          if (mounted && prods && prods.length > 0) {
            dispatch({ type: 'SET_PRODUCTS', payload: prods });
            hasBackendData = true;
          }
        }
        
        if (vidRes.ok) {
          const vids = await vidRes.json();
          if (mounted) dispatch({ type: 'SET_VIDEOS', payload: vids });
        }
        if (banRes.ok) {
          const bans = await banRes.json();
          if (mounted) dispatch({ type: 'SET_BANNERS', payload: bans });
        }
        if (coupRes.ok) {
          const coups = await coupRes.json();
          if (mounted) dispatch({ type: 'SET_COUPONS', payload: coups });
        }

        // If no backend products, keep showing seed data
        if (!hasBackendData && mounted) {
          console.warn('Backend returned no products, keeping seed data');
        }
      } catch (e) {
        console.error('Failed to fetch from backend:', e);
        // Keep showing seed data as fallback
        console.log('Using seed data as fallback');
      }
    };
    hydrate();
    return () => { mounted = false; };
  }, []);

  // Only persist user to localStorage, NOT products/videos/banners/coupons
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
