import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/api';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const qty = Number(queryParams.get('qty')) || 1;
  const size = queryParams.get('size') || '';
  const color = queryParams.get('color') || '';

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: '', address: '', city: '', postalCode: '', country: 'India', phoneNumber: ''
  });
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    // In a real app we'd dispatch to Redux/Context. Here we'll simulate adding.
    if (id) {
      const fetchItem = async () => {
        try {
          const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
          const data = await res.json();
          setCartItems([{...data, qty, selectedSize: size, selectedColor: color}]);
        } catch (e) {
          console.error('Error adding to cart');
        }
      };
      fetchItem();
    }
  }, [id, qty, size, color]);

  const removeFromCartHandler = (removeId: any) => {
    setCartItems(cartItems.filter(x => x._id !== removeId));
    navigate('/cart');
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({...shippingAddress, [e.target.name]: e.target.value});
  };

  const processPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setPaymentLoading(false);
      return;
    }

    const totalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    try {
      // 1. Fetch Razorpay config
      const configRes = await fetch(`${API_ENDPOINTS.BASE_URL}/payment/razorpay/config`);
      const { keyId } = await configRes.json();

      // 2. Create MongoDB Order
      const orderResponse = await fetch(`${API_ENDPOINTS.BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod: 'Razorpay',
          itemsPrice: totalAmount,
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: totalAmount,
        })
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok) throw new Error('Failed to create order');

      // 3. Create Razorpay Order
      const rzpResponse = await fetch(`${API_ENDPOINTS.BASE_URL}/payment/razorpay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, receipt: orderData._id })
      });
      const rzpData = await rzpResponse.json();

      if (!rzpResponse.ok) throw new Error('Failed to init payment');

      // 4. Open Razorpay Checkout Modal
      const options = {
        key: keyId,
        amount: rzpData.amount,
        currency: rzpData.currency,
        name: "Gul Fashion",
        description: "Premium Ethnic Wear",
        order_id: rzpData.id,
        handler: async function (response: any) {
          // 5. Verify payment & Trigger Shipmozo
          const verifyRes = await fetch(`${API_ENDPOINTS.BASE_URL}/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              mongo_order_id: orderData._id,
              user_details: { name: shippingAddress.name }
            })
          });
          
          if (verifyRes.ok) {
            alert('Payment Successful! Order Confirmed. Your AWB has been generated.');
            setCartItems([]);
            navigate('/track');
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: shippingAddress.name,
          contact: shippingAddress.phoneNumber
        },
        theme: {
          color: "#4B0082"
        }
      };
      
      // Mock flow handler if using dummy keys
      if (rzpData.id.startsWith('order_mock_')) {
        options.handler({
          razorpay_payment_id: 'mock_payment_' + Date.now(),
          razorpay_order_id: rzpData.id,
          razorpay_signature: 'mock_signature_skip'
        });
        return;
      }

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (err) {
      console.error(err);
      alert('Error initiating checkout. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
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
          {!isCheckingOut ? (
            <>
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
                      {(item.selectedSize || item.selectedColor) && (
                        <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#666', display: 'flex', gap: '15px' }}>
                          {item.selectedSize && <span>Size: <strong style={{ color: '#2D0A4E' }}>{item.selectedSize}</strong></span>}
                          {item.selectedColor && <span>Color: <strong style={{ color: '#2D0A4E' }}>{item.selectedColor}</strong></span>}
                        </div>
                      )}
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
                  onClick={() => setIsCheckingOut(true)}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </>
          ) : (
            <div className="checkout-form-wrap" style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
              <h2 className="font-serif summary-title">Shipping Details</h2>
              <form onSubmit={processPayment} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input type="text" name="name" placeholder="Full Name" value={shippingAddress.name} onChange={handleInputChange} required className="form-input" />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={shippingAddress.phoneNumber} onChange={handleInputChange} required className="form-input" />
                <input type="text" name="address" placeholder="Complete Address" value={shippingAddress.address} onChange={handleInputChange} required className="form-input" />
                <div style={{display: 'flex', gap: '15px'}}>
                  <input type="text" name="city" placeholder="City" value={shippingAddress.city} onChange={handleInputChange} required className="form-input" style={{flex: 1}} />
                  <input type="text" name="postalCode" placeholder="Pincode" value={shippingAddress.postalCode} onChange={handleInputChange} required className="form-input" style={{flex: 1}} />
                </div>
                
                <div className="summary-row" style={{marginTop: '20px', padding: '15px 0', borderTop: '1px solid #eee'}}>
                  <span>Total Amount to Pay</span>
                  <span className="summary-total">₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                </div>

                <div style={{display: 'flex', gap: '15px', marginTop: '10px'}}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsCheckingOut(false)} style={{flex: 1}}>BACK TO CART</button>
                  <button type="submit" className="btn btn-primary" disabled={paymentLoading} style={{flex: 2}}>
                    {paymentLoading ? 'PROCESSING...' : 'PAY NOW (RAZORPAY)'}
                  </button>
                </div>
              </form>
            </div>
          )}
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
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary-purple);
          box-shadow: 0 0 0 2px rgba(75,0,130,0.1);
        }
        .btn-outline {
          background: transparent;
          border: 1px solid var(--primary-purple);
          color: var(--primary-purple);
        }
        .btn-outline:hover {
          background: var(--primary-purple);
          color: white;
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

