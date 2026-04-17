import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const removeFromCartHandler = (removeId: string) => {
    setCartItems(cartItems.filter(x => x._id !== removeId));
    navigate('/cart');
  };

  const checkoutHandler = () => {
    alert('Proceeding to Checkout... Integration with Payment Gateway needed!');
  };

  return (
    <div className="container page-top-padding" style={{padding: '50px 5%'}}>
      <h1 className="font-serif text-center" style={{fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)'}}>Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center" style={{padding: '50px 0', border: '1px solid #eee', background: '#fafafa', borderRadius: '4px'}}>
          <h2 className="font-serif mb-4" style={{marginBottom: '20px'}}>Your cart is empty</h2>
          <Link to="/shop" className="btn btn-primary">Go Back To Shop</Link>
        </div>
      ) : (
        <div className="cart-grid" style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
          <div className="cart-items" style={{flex: '2', minWidth: '300px'}}>
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item flex items-center justify-between" style={{borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px'}}>
                <div style={{width: '20%'}}>
                  <img src={item.image} alt={item.name} style={{width: '100%', borderRadius: '4px'}} />
                </div>
                <div style={{width: '40%', paddingLeft: '20px'}}>
                  <Link to={`/product/${item._id}`} className="font-serif" style={{fontSize: '1.2rem', color: '#333'}}>
                    {item.name}
                  </Link>
                </div>
                <div style={{width: '15%'}}>₹{item.price.toLocaleString('en-IN')}</div>
                <div style={{width: '15%'}}>
                  <span>Qty: {item.qty}</span>
                </div>
                <div style={{width: '10%'}}>
                  <button onClick={() => removeFromCartHandler(item._id)} className="btn btn-outline" style={{padding: '5px 10px', fontSize: '0.8rem'}}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary" style={{flex: '1', minWidth: '300px', padding: '20px', border: '1px solid #eee', background: '#fcfcfc', alignSelf: 'flex-start', borderRadius: '4px'}}>
            <h2 className="font-serif" style={{borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px'}}>Cart Summary</h2>
            <div className="flex justify-between" style={{marginBottom: '15px'}}>
              <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
            </div>
            <button 
              type="button" 
              className="btn btn-primary w-full"
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
