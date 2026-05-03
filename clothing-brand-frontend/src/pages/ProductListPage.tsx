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
    <div className="container page-top-padding">
      <h1 className="title font-serif text-center" style={{margin: '40px 0'}}>Shop The Collection</h1>
      
      {loading ? (
        <h2 className="text-center font-serif">Loading...</h2>
      ) : error ? (
        <div className="error-box text-center">
          <p>{error}</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
              </Link>
              <div className="product-details">
                <Link to={`/product/${product._id}`}>
                  <h3 className="product-name font-serif">{product.name}</h3>
                </Link>
                <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
