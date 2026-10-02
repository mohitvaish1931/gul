import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import WishlistButton from '../components/WishlistButton';
import { useWishlist } from '../utils/savedProducts';
import { splitProductName } from '../utils/productName';
import { getImageUrl } from '../utils/mediaHelper';
import { useSEO } from '../utils/useSEO';

const WishlistPage = () => {
  const wishlist = useWishlist();

  useSEO({
    title: 'My Wishlist | Gul Fashion',
    description: 'Your saved Gul Fashion favourites.',
    url: 'https://gulfashion.store/wishlist',
    noindex: true,
  });

  return (
    <div style={{ backgroundColor: '#FDFBFD', minHeight: '80vh', padding: '60px 16px 100px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: 800, fontSize: '0.7rem' }}>SAVED FOR LATER</span>
          <h1 className="font-serif" style={{ color: '#2D0A4E', fontSize: '2.6rem', margin: '8px 0 0' }}>My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed #e5d9f2', borderRadius: '20px', background: '#fff' }}>
            <Heart size={40} color="#D4AF37" strokeWidth={1.5} style={{ marginBottom: '14px' }} />
            <p style={{ color: '#555', marginBottom: '24px' }}>Tap the heart on any design to save it here.</p>
            <Link to="/shop" className="btn btn-primary">Explore the Collection</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '28px' }}>
            {wishlist.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#2D0A4E' }}>
                <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '3 / 4' }}>
                  <img src={getImageUrl(product.image, 600)} alt={product.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <WishlistButton product={product} size={16} style={{ position: 'absolute', top: '12px', right: '12px' }} />
                </div>
                <p className="font-serif" style={{ fontSize: '1.05rem', margin: '12px 0 4px', lineHeight: 1.35 }}>{splitProductName(product.name).title}</p>
                <p style={{ fontWeight: 700, margin: 0 }}>
                  ₹{Number(product.price).toLocaleString('en-IN')}
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span style={{ marginLeft: '8px', color: '#999', fontWeight: 400, textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
