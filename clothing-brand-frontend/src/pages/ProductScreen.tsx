import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductStyles.css';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product or backend not running');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div className="product-page-detail" style={{ backgroundColor: '#FDFBFD', minHeight: '100vh', padding: '60px 20px 100px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/shop" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '10px', 
          color: '#2D0A4E', 
          textDecoration: 'none', 
          fontWeight: '800', 
          fontSize: '0.75rem', 
          letterSpacing: '2px', 
          marginBottom: '40px',
          textTransform: 'uppercase'
        }}>
          <ArrowLeft size={16} /> BACK TO COLLECTION
        </Link>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <div className="loader-spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#FFF5F5', borderRadius: '24px', border: '1px solid #FED7D7' }}>
             <p style={{ color: '#C53030' }}>{error}</p>
          </div>
        ) : (
          <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* Image Section */}
            <div className="product-image-section">
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                 <img src={product.image} alt={product.name} style={{ width: '100%', display: 'block' }} />
                 {product.countInStock === 0 && (
                   <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '10px 25px', borderRadius: '50px', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '2px' }}>SOLD OUT</span>
                   </div>
                 )}
              </div>
            </div>
            
            {/* Info Section */}
            <div className="product-info-section">
              <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '15px' }}>{product.category}</span>
              <h1 className="font-serif" style={{ fontSize: '3rem', color: '#2D0A4E', marginBottom: '15px', lineHeight: '1.2' }}>{product.name}</h1>
              
              <div style={{ marginBottom: '30px' }}>
                 <span style={{ fontSize: '2rem', fontWeight: '800', color: '#2D0A4E' }}>₹{product.price?.toLocaleString('en-IN')}</span>
                 <span style={{ marginLeft: '15px', color: '#999', fontSize: '0.9rem', textDecoration: 'line-through' }}>₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
              </div>

              <div style={{ color: '#666', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '40px', borderBottom: '1px solid #f0f0f0', paddingBottom: '30px' }}>
                <p>{product.description}</p>
              </div>

              {/* Purchase Card */}
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0', marginBottom: '40px' }}>
                 {product.countInStock > 0 ? (
                   <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                      <span style={{ fontWeight: '800', color: '#2D0A4E', fontSize: '0.85rem', letterSpacing: '1px' }}>SELECT QUANTITY</span>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '800' }}>-</button>
                        <span style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', minWidth: '40px', textAlign: 'center', fontWeight: '800' }}>{qty}</span>
                        <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} style={{ padding: '10px 15px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '800' }}>+</button>
                      </div>
                    </div>
                    <button 
                      onClick={addToCartHandler}
                      style={{ 
                        width: '100%', 
                        padding: '20px', 
                        backgroundColor: '#2D0A4E', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        fontWeight: '800', 
                        letterSpacing: '2px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 10px 30px rgba(45,10,78,0.1)'
                      }}
                    >
                      <ShoppingCart size={20} /> ADD TO COLLECTION
                    </button>
                   </>
                 ) : (
                   <div style={{ textAlign: 'center', padding: '10px 0' }}>
                      <p style={{ color: '#C53030', fontWeight: '800', letterSpacing: '1px' }}>WE ARE CURRENTLY OUT OF STOCK</p>
                      <button disabled style={{ width: '100%', padding: '18px', backgroundColor: '#eee', color: '#999', border: 'none', borderRadius: '12px', marginTop: '15px', fontWeight: '800' }}>NOTIFY ME</button>
                   </div>
                 )}
              </div>

              {/* USP Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px' }}>
                 <div style={{ textAlign: 'center' }}>
                    <ShieldCheck size={24} color="#D4AF37" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>SECURE PAYMENT</p>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <Truck size={24} color="#D4AF37" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>FREE DELIVERY</p>
                 </div>
                 <div style={{ textAlign: 'center' }}>
                    <RefreshCcw size={24} color="#D4AF37" style={{ marginBottom: '10px' }} />
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>EASY EXCHANGE</p>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .product-page-detail h1 {
            font-size: 2.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductScreen;
