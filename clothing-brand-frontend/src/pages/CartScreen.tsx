import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // In a real app we'd dispatch to Redux/Context. Here we'll simulate adding.
    if (id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`/api/products/${id}`);
          const data = await res.json();
          // Add to local cart state for demo
          setCartItems([{...data, qty}]);
        } catch (e) {
          console.error('Error adding to cart');
        }
      };
      fetchItem();
    }
  }, [id, qty]);

  const removeFromCartHandler = (removeId: any) => {
    setCartItems(cartItems.filter(x => x._id !== removeId));
    navigate('/cart');
  };

  const checkoutHandler = () => {
    alert('Proceeding to Checkout... Integration with Payment Gateway needed!');
  };

  return (
    <div className="container page-top-padding cart-screen-container">
      <h1 className="font-serif text-center" style={{fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-purple)'}}>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center" style={{padding: '50px 0', border: '1px solid #efe4ff', background: '#fdfaff', borderRadius: '4px'}}>
          <h2 className="font-serif mb-4" style={{marginBottom: '20px'}}>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary">Go Back To Shop</Link>
        </div>
      ) : (
        <div className="cart-grid-wrap">
          <div className="cart-items-list-wrap">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item-card">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <Link to={`/product/${item._id}`} className="font-serif item-name-link">
                    {item.name}
                  </Link>
                  <div className="item-meta">
                    <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="item-qty">Qty: {item.qty}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeFromCartHandler(item._id)} className="btn-remove">
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h2 className="font-serif summary-title">Cart Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span className="summary-total">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
            </div>
            <button 
              type="button" 
              className="btn btn-primary w-full"
              onClick={checkoutHandler}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}

      <style>{`
        .cart-screen-container {
          padding: 50px 20px !important;
        }
        .cart-grid-wrap {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }
        .cart-items-list-wrap {
          flex: 2;
          min-width: 280px;
        }
        .cart-item-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }
        .cart-item-img {
          width: 80px;
          flex-shrink: 0;
        }
        .cart-item-img img {
          width: 100%;
          border-radius: 4px;
        }
        .cart-item-info {
          flex: 1;
        }
        .item-name-link {
          font-size: 1.1rem;
          color: #333;
          text-decoration: none;
          display: block;
          margin-bottom: 5px;
        }
        .item-meta {
          display: flex;
          gap: 15px;
          font-size: 0.9rem;
          color: #666;
        }
        .item-price {
          font-weight: 700;
          color: var(--accent-purple);
        }
        .cart-item-actions {
          margin-left: auto;
        }
        .btn-remove {
          background: none;
          border: 1px solid #ddd;
          padding: 5px 12px;
          font-size: 0.65rem;
          font-weight: 800;
          cursor: pointer;
          border-radius: 4px;
          color: #999;
          transition: all 0.3s;
        }
        .btn-remove:hover {
          color: #e53e3e;
          border-color: #e53e3e;
        }
        .cart-summary-card {
          flex: 1;
          min-width: 280px;
          padding: 30px;
          background: #fcfcfc;
          border: 1px solid #eee;
          border-radius: 8px;
          align-self: flex-start;
        }
        .summary-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          font-weight: 600;
        }
        .summary-total {
          font-size: 1.2rem;
          color: var(--primary-purple);
        }

        @media (max-width: 768px) {
          .cart-screen-container h1 {
            font-size: 1.8rem !important;
          }
          .cart-item-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .cart-item-img {
            width: 100px;
          }
          .cart-item-actions {
            margin-left: 0;
            width: 100%;
          }
          .btn-remove {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CartScreen;

