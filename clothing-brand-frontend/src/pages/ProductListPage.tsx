import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/api';
import { getImageUrl } from '../utils/mediaHelper';
import './ProductStyles.css';
import { useSEO } from '../utils/useSEO';
import WishlistButton from '../components/WishlistButton';
import { splitProductName } from '../utils/productName';
import { findOccasion } from '../utils/occasions';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

const ProductListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';
  const category = queryParams.get('category') || '';
  const occasion = category ? undefined : findOccasion(queryParams.get('occasion'));

  const pageHeading = category || occasion?.label || (keyword ? `Search: "${keyword}"` : 'All Collections');
  const canonicalUrl = category
    ? `https://gulfashion.store/shop?category=${encodeURIComponent(category)}`
    : occasion
      ? `https://gulfashion.store/shop?occasion=${occasion.key}`
      : 'https://gulfashion.store/shop';
  useSEO({
    title: `${pageHeading} | Gul Fashion`,
    description: category || occasion
      ? `Shop ${pageHeading} for women at Gul Fashion. Handcrafted ethnic and casual wear from Jaipur with free shipping across India.`
      : 'Shop kurta sets, suits, tops and dresses for women at Gul Fashion. Handcrafted in Jaipur with free shipping across India.',
    url: canonicalUrl,
    noindex: Boolean(keyword), // search result pages shouldn't be indexed
  });

  const [sort, setSort] = useState<SortOption>('featured');

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = API_ENDPOINTS.PRODUCTS;
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        } else if (occasion) {
          url += `?occasion=${occasion.key}`;
        } else if (keyword) {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productsArray = Array.isArray(data) ? data : (data.products || []);
        setProducts(productsArray);
        setLoading(false);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load products. Please try again.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category, occasion]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    return 0; // featured = the order set in admin
  });

  return (
    <div className="shop-page">
      {/* Collection header */}
      <section className="shop-header">
         <div className="container">
            <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/shop">Shop</Link>
            </nav>
            <h1 className="section-heading shop-title">
               {category || occasion?.label || (keyword ? `Results for "${keyword}"` : 'All designs')}
            </h1>
            <p className="section-subtext">
               {occasion ? occasion.tagline : 'Kurta sets, suits and everyday cottons, made at our studio in Jaipur.'}
            </p>
         </div>
      </section>

      <div className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <div className="loader-spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
             <p style={{ marginTop: '20px', color: 'var(--ink-soft)' }}>Loading designs…</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#FFF5F5', borderRadius: '24px', border: '1px solid #FED7D7' }}>
            <p style={{ color: '#C53030', fontWeight: '600' }}>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <h2 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '20px' }}>Nothing matches that search</h2>
             <p style={{ color: '#666', marginBottom: '30px' }}>Try another word, like kurta, suit or cotton.</p>
             <Link to="/shop" className="btn btn-primary">See all designs</Link>
          </div>
        ) : (
          <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>{products.length} {products.length === 1 ? 'design' : 'designs'}</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 500 }}>
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff', fontSize: '0.9rem', color: '#333' }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))', gap: '32px 20px' }}>
            {sortedProducts.map((product, idx) => {
              const discount = product.originalPrice && product.price && product.originalPrice > product.price 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <div key={product._id} className={`luxury-product-card reveal-on-scroll delay-${(idx % 4) * 100}`}>
                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <div className="luxury-img-wrapper">
                      <img src={getImageUrl(product.image, 600)} alt={product.name} className="primary-img" loading="lazy" />
                      {product.images && product.images.length > 1 && (
                        <img src={getImageUrl(product.images[1], 600)} alt={`${product.name} alternate`} className="secondary-img" loading="lazy" />
                      )}
                      {product.isNew && (
                        <span className="new-arrival-tag">NEW ARRIVAL</span>
                      )}
                      {discount > 0 && (
                        <span className="discount-badge">{discount}% off</span>
                      )}
                      <WishlistButton product={product} size={16} style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }} />
                    </div>
                    <div className="luxury-card-details">
                      <h3 className="luxury-name">{splitProductName(product.name).title}</h3>
                      <div className="luxury-price-row">
                         <div style={{ display: 'flex', flexDirection: 'column' }}>
                           {discount > 0 && (
                             <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem' }}>
                               ₹{product.originalPrice.toLocaleString('en-IN')}
                             </span>
                           )}
                           <span className="luxury-price">₹{product.price.toLocaleString('en-IN')}</span>
                         </div>
                         
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          </>
        )}
      </div>

      <style>{`
        .hover-zoom:hover {
          transform: scale(1.08);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .shop-page h1 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductListPage;
