import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProductStyles.css';

const ProductListPage = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?keyword=${keyword}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Make sure the backend is running and MongoDB is seeded!');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="shop-page" style={{ backgroundColor: '#FDFBFD', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Category Header */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center', marginBottom: '60px' }}>
         <div className="container">
            <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>CURATED SELECTION</span>
            <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
               {keyword ? `Search: "${keyword}"` : 'Shop The Collection'}
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
               Experience the finest Jaipur craftsmanship, meticulously curated for the modern connoisseur.
            </p>
         </div>
      </section>

      <div className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <div className="loader-spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
             <p style={{ marginTop: '20px', color: '#666', fontFamily: 'serif' }}>Curating your collection...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', backgroundColor: '#FFF5F5', borderRadius: '24px', border: '1px solid #FED7D7' }}>
            <p style={{ color: '#C53030', fontWeight: '600' }}>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <h2 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '20px' }}>No treasures found.</h2>
             <p style={{ color: '#666', marginBottom: '30px' }}>Try a different search term or explore our full collection.</p>
             <Link to="/shop" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: '800', letterSpacing: '1px' }}>VIEW ALL PRODUCTS</Link>
          </div>
        ) : (
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '40px' }}>
            {products.map(product => (
              <div key={product._id} className="luxury-product-card" style={{ transition: 'transform 0.3s' }}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    position: 'relative', 
                    aspectRatio: '3/4', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    marginBottom: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                  }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} className="hover-zoom" />
                    {product.isNew && (
                      <span style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#D4AF37', color: '#fff', padding: '5px 12px', fontSize: '0.65rem', fontWeight: '800', borderRadius: '50px', letterSpacing: '1px' }}>NEW ARRIVAL</span>
                    )}
                  </div>
                  <div style={{ padding: '0 10px' }}>
                    <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#2D0A4E', marginBottom: '8px', lineHeight: '1.4' }}>{product.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#D4AF37' }}>₹{product.price.toLocaleString('en-IN')}</span>
                       <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: '600' }}>JAIPUR ATELIER</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
