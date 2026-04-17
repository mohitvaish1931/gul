import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductStyles.css';

interface Product {
  _id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  countInStock: number;
}

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Partial<Product>>({});
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
    <div className="container page-top-padding" style={{padding: '50px 5%'}}>
      <Link to="/shop" className="btn btn-outline" style={{marginBottom: '30px'}}>
        Go Back
      </Link>
      
      {loading ? (
        <h2 className="text-center font-serif">Loading...</h2>
      ) : error ? (
        <div className="error-box text-center"><p>{error}</p></div>
      ) : (
        <div className="product-screen-grid flex flex-col pt-4" style={{justifyContent: 'space-between'}}>
          <div className="product-screen-image">
            <img src={product.image} alt={product.name} style={{width: '100%', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
          </div>
          
          <div className="product-screen-info">
            <h1 className="font-serif" style={{fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary-color)'}}>{product.name}</h1>
            <h3 style={{fontSize: '1rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px'}}>
              Brand: {product.brand} | Category: {product.category}
            </h3>
            
            <div className="description" style={{marginBottom: '30px', lineHeight: '1.8', color: '#444'}}>
              <p>{product.description}</p>
            </div>
            
            <div className="price-card" style={{padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '4px'}}>
              <div className="flex justify-between" style={{marginBottom: '10px', fontSize: '1.25rem', fontWeight: 'bold'}}>
                <span>Price:</span>
                <span>₹{product.price ? product.price.toLocaleString('en-IN') : 0}</span>
              </div>
              
              <div className="flex justify-between" style={{marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>
                <span>Status:</span>
                <span style={{color: (product.countInStock ?? 0) > 0 ? 'green' : 'red'}}>
                  {(product.countInStock ?? 0) > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {(product.countInStock ?? 0) > 0 && (
                <div className="flex justify-between" style={{marginBottom: '20px'}}>
                  <span>Quantity:</span>
                  <select 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                    style={{padding: '5px 10px', border: '1px solid #ccc'}}
                  >
                    {[...Array(product.countInStock ?? 0).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button 
                onClick={addToCartHandler}
                disabled={(product.countInStock ?? 0) === 0}
                className="btn btn-primary" 
                style={{width: '100%', opacity: (product.countInStock ?? 0) === 0 ? 0.5 : 1}}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
