import { Heart } from 'lucide-react';
import { toggleWishlist, useWishlist, type SavedProduct } from '../utils/savedProducts';

interface WishlistButtonProps {
  product: SavedProduct;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const WishlistButton = ({ product, size = 18, className = '', style }: WishlistButtonProps) => {
  const wishlist = useWishlist();
  const saved = wishlist.some((p) => p._id === product._id);

  return (
    <button
      type="button"
      className={`wishlist-btn ${className}`}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      onClick={(e) => {
        // cards are wrapped in links - don't open the product
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 18,
        height: size + 18,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        color: saved ? '#C2185B' : '#2D0A4E',
        ...style,
      }}
    >
      <Heart size={size} fill={saved ? '#C2185B' : 'none'} strokeWidth={1.8} />
    </button>
  );
};

export default WishlistButton;
