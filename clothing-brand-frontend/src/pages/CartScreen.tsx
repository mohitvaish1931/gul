import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, API_BASE_URL } from '../utils/api';
import { useAppContext } from '../context/AppContext';
import { getImageUrl } from '../utils/mediaHelper';
import { splitProductName } from '../utils/productName';
import { useSEO } from '../utils/useSEO';
import { trackAddShippingInfo, trackBeginCheckout, trackPurchase, trackRemoveFromCart, trackViewCart } from '../utils/analytics';

// A 10-digit Indian mobile number, also accepted with +91 or a leading 0
const isValidMobile = (value: string) => {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits);
};

const CartScreen = () => {
  useSEO({
    title: 'Shopping Cart | Gul Fashion',
    description: 'Review the items in your Gul Fashion cart and check out securely.',
    url: 'https://gulfashion.store/cart',
    noindex: true,
  });

  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const cartItems = state.cart;

  // Checkout needs no account: a mobile number is enough, email is optional
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '', email: user?.email || '', address: '', city: '', postalCode: '', country: 'India', phoneNumber: ''
  });
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discountPercent: number, maxDiscountAmount?: number} | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Cart is managed globally via AppContext; this only reports the bag view once per visit
  useEffect(() => {
    if (cartItems.length > 0) trackViewCart(cartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyCouponHandler = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMessage(null);
    try {
      const res = await fetch(`${API_ENDPOINTS.COUPONS}/validate/${couponCode}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid coupon');

      // Check max price threshold
      if (data.maxPriceThreshold !== null && data.maxPriceThreshold !== undefined) {
        const hasExpensiveItem = cartItems.some(item => item.price > data.maxPriceThreshold);
        if (hasExpensiveItem) {
          throw new Error(`Coupon is invalid! Only valid on items up to ₹${data.maxPriceThreshold}`);
        }
      }

      // Check categories
      if (data.applicableCategories && data.applicableCategories.length > 0) {
        const hasValidCategory = cartItems.some(item => data.applicableCategories.includes(item.category));
        if (!hasValidCategory) {
          throw new Error(`Coupon only valid on ${data.applicableCategories.join(' and ')}`);
        }
      }

      setAppliedCoupon(data);
      const maxDiscount = data.maxDiscountAmount || 800;
      setCouponMessage({ type: 'success', text: `Coupon applied! ${data.discountPercent}% off (Max ₹${maxDiscount}).` });
      setCouponCode('');
    } catch (err: any) {
      setCouponMessage({ type: 'error', text: err.message });
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const calculateDiscountAmount = (items: any[], coupon: any) => {
    if (!coupon) return 0;
    let eligibleSubtotal = 0;
    for (const item of items) {
      let isEligible = true;
      if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
        if (!coupon.applicableCategories.includes(item.category)) {
          isEligible = false;
        }
      }
      if (coupon.maxPriceThreshold !== null && coupon.maxPriceThreshold !== undefined) {
        if (item.price > coupon.maxPriceThreshold) {
          isEligible = false;
        }
      }
      if (isEligible) {
        eligibleSubtotal += (item.qty * item.price);
      }
    }
    let calculatedDiscount = Math.round((eligibleSubtotal * coupon.discountPercent) / 100);
    const maxDiscount = coupon.maxDiscountAmount || 800;
    if (calculatedDiscount > maxDiscount) {
      calculatedDiscount = maxDiscount;
    }
    return calculatedDiscount;
  };

  const removeCouponHandler = () => {
    setAppliedCoupon(null);
    setCouponMessage(null);
  };

  const updateQtyHandler = (id: any, selectedSize: string | undefined, selectedColor: string | undefined, newQty: number) => {
    if(newQty > 0) {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, selectedSize, selectedColor, qty: newQty } });
    }
  };
  
  const removeFromCartHandler = (removeId: any, selectedSize?: string, selectedColor?: string) => {
    const removed = cartItems.find((item) =>
      (item.id || item._id) === removeId && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
    if (removed) trackRemoveFromCart(removed);
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: removeId, selectedSize, selectedColor } });
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
    if (!isValidMobile(shippingAddress.phoneNumber)) {
      setCheckoutError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPaymentLoading(true);
    setCheckoutError(null);

    const res = await loadRazorpayScript();
    if (!res) {
      setCheckoutError('Payment service could not load. Please check your internet connection and try again.');
      setPaymentLoading(false);
      return;
    }

    const subtotalAmount = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const discountAmount = calculateDiscountAmount(cartItems, appliedCoupon);
    const totalAmount = subtotalAmount - discountAmount;
    const purchasedItems = [...cartItems];
    const couponUsed = appliedCoupon?.code;
    trackAddShippingInfo(purchasedItems, totalAmount, couponUsed);

    try {
      // 1. Fetch Razorpay config
      const configRes = await fetch(`${API_BASE_URL}/api/payment/razorpay/config`);
      const { keyId } = await configRes.json();

      // 2. Create MongoDB Order
      const orderResponse = await fetch(`${API_ENDPOINTS.ORDERS.BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod: 'Razorpay',
          itemsPrice: subtotalAmount, // Usually subtotal
          taxPrice: 0,
          shippingPrice: 0,
          discountAmount,
          couponCode: appliedCoupon ? appliedCoupon.code : null,
          totalPrice: totalAmount,
        })
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        setCheckoutError(orderData.message || 'We could not place your order. Please try again.');
        return;
      }

      // Proves this browser placed the order: needed to pay without an account and to
      // open the confirmation page afterwards
      const checkoutToken: string | undefined = orderData.checkoutToken;
      if (checkoutToken) {
        try { sessionStorage.setItem(`gul_order_${orderData._id}`, checkoutToken); } catch { /* not saved */ }
      }
      const userDetails = { name: shippingAddress.name, email: shippingAddress.email || undefined };

      // If total amount is 0 (100% off coupon), we can bypass Razorpay!
      if (totalAmount === 0) {
        // Call bypass route to mark as paid and trigger Shipmozo
        const bypassRes = await fetch(`${API_BASE_URL}/api/payment/bypass`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ mongo_order_id: orderData._id, checkout_token: checkoutToken, user_details: userDetails })
        });
        
        if (bypassRes.ok) {
          trackPurchase(orderData._id, purchasedItems, totalAmount, couponUsed);
          dispatch({ type: 'CLEAR_CART' });
          navigate(`/order/${orderData._id}/success`);
        } else {
          setCheckoutError('We could not confirm your order. Please contact us on WhatsApp.');
        }
        setPaymentLoading(false);
        return;
      }

      // 3. Create Razorpay Order
      const rzpResponse = await fetch(`${API_BASE_URL}/api/payment/razorpay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount, receipt: orderData._id, checkout_token: checkoutToken })
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
          setPaymentLoading(true);
          const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              mongo_order_id: orderData._id,
              checkout_token: checkoutToken,
              user_details: userDetails
            })
          });
          
          if (verifyRes.ok) {
            trackPurchase(orderData._id, purchasedItems, totalAmount, couponUsed);
            dispatch({ type: 'CLEAR_CART' });
            navigate(`/order/${orderData._id}/success`);
          } else {
            setPaymentLoading(false);
            setCheckoutError('Your payment could not be verified. If money was deducted, please WhatsApp us your order details and we will sort it out right away.');
          }
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email || undefined,
          contact: shippingAddress.phoneNumber
        },
        theme: {
          color: "#2D0A4E"
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
      setCheckoutError('Something went wrong while starting checkout. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="container page-top-padding cart-screen-container">
      <h1 className="section-heading cart-title">{isCheckingOut ? 'Delivery details' : 'Your bag'}</h1>
      
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your bag is empty.</p>
          <Link to="/shop" className="btn btn-primary">Browse the collection</Link>
        </div>
      ) : (
        <div className="cart-grid-wrap">
          {!isCheckingOut ? (
            <>
              <div className="cart-items-list-wrap">
                {cartItems.map((item) => (
                  <div key={`${item._id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="cart-item-card">
                    <Link to={`/product/${item._id}`} className="cart-item-img">
                      <img src={getImageUrl(item.image, 300)} alt="" />
                    </Link>
                    <div className="cart-item-info">
                      <Link to={`/product/${item._id}`} className="item-name-link">
                        {splitProductName(item.name).title}
                      </Link>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="cart-item-options">
                          {[item.selectedSize && `Size ${item.selectedSize}`, item.selectedColor].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      <p className="item-price">₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</p>
                      <div className="cart-item-row">
                        <div className="pdp-stepper">
                          <button type="button" aria-label="Decrease quantity" onClick={() => updateQtyHandler(item.id || item._id, item.selectedSize, item.selectedColor, (item.qty || 1) - 1)}>−</button>
                          <span aria-live="polite">{item.qty || 1}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => updateQtyHandler(item.id || item._id, item.selectedSize, item.selectedColor, (item.qty || 1) + 1)}>+</button>
                        </div>
                        <button type="button" onClick={() => removeFromCartHandler(item.id || item._id, item.selectedSize, item.selectedColor)} className="btn-remove">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary-card">
                <h2 className="summary-title">Order summary</h2>
                
                {/* Coupon Code Section */}
                <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                  <label htmlFor="coupon-code" style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--ink)', display: 'block', marginBottom: '10px' }}>Coupon code</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      id="coupon-code"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter code" 
                      className="form-input"
                      style={{ padding: '8px 12px', flex: 1, textTransform: 'uppercase' }}
                      disabled={!!appliedCoupon}
                    />
                    {!appliedCoupon ? (
                      <button 
                        onClick={applyCouponHandler} 
                        disabled={couponLoading || !couponCode.trim()}
                        style={{ backgroundColor: 'var(--ink)', color: 'white', border: 'none', borderRadius: '2px', padding: '0 18px', fontWeight: 500, cursor: 'pointer', opacity: (couponLoading || !couponCode.trim()) ? 0.6 : 1 }}
                      >
                        {couponLoading ? '…' : 'Apply'}
                      </button>
                    ) : (
                      <button 
                        onClick={removeCouponHandler}
                        style={{ backgroundColor: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', borderRadius: '2px', padding: '0 14px', fontWeight: 500, cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {couponMessage && (
                    <p style={{ marginTop: '8px', fontSize: '0.8rem', color: couponMessage.type === 'success' ? '#16a34a' : '#ef4444' }}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>

                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} {cartItems.reduce((acc, item) => acc + item.qty, 0) === 1 ? 'item' : 'items'})</span>
                  <span>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                {appliedCoupon && (
                  <div className="summary-row" style={{ color: '#1F7A4D' }}>
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span>-₹{calculateDiscountAmount(cartItems, appliedCoupon).toLocaleString('en-IN')}</span>
                  </div>
                )}
                
                <div className="summary-row" style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '10px' }}>
                  <span style={{ fontWeight: 500 }}>Total</span>
                  <span className="summary-total">₹{(
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) - 
                    calculateDiscountAmount(cartItems, appliedCoupon)
                  ).toLocaleString('en-IN')}</span>
                </div>
                
                <button 
                  type="button" 
                  className="btn btn-primary w-full"
                  onClick={() => {
                    trackBeginCheckout(
                      cartItems,
                      cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) - calculateDiscountAmount(cartItems, appliedCoupon),
                      appliedCoupon?.code
                    );
                    setIsCheckingOut(true);
                  }}
                >
                  Checkout securely
                </button>
              </div>
            </>
          ) : (
            <div className="checkout-form-wrap" style={{width: '100%', maxWidth: '600px', margin: '0 auto'}}>
              <h2 className="summary-title">Where should we deliver?</h2>
              {!user && (
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', margin: '-8px 0 16px' }}>
                  No account needed. Your mobile number is used for delivery.
                </p>
              )}
              <form onSubmit={processPayment} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <input type="text" name="name" placeholder="Full name" aria-label="Full name" autoComplete="name" value={shippingAddress.name} onChange={handleInputChange} required className="form-input" />
                <input type="tel" name="phoneNumber" placeholder="Mobile number" aria-label="Mobile number" autoComplete="tel" inputMode="tel" value={shippingAddress.phoneNumber} onChange={handleInputChange} required className="form-input" />
                <input type="email" name="email" placeholder="Email (optional)" aria-label="Email, optional" autoComplete="email" value={shippingAddress.email} onChange={handleInputChange} className="form-input" />
                <input type="text" name="address" placeholder="House number, street and area" aria-label="Address" autoComplete="street-address" value={shippingAddress.address} onChange={handleInputChange} required className="form-input" />
                <div style={{display: 'flex', gap: '15px'}}>
                  <input type="text" name="city" placeholder="City" aria-label="City" autoComplete="address-level2" value={shippingAddress.city} onChange={handleInputChange} required className="form-input" style={{flex: 1}} />
                  <input type="text" name="postalCode" placeholder="Pincode" aria-label="Pincode" autoComplete="postal-code" inputMode="numeric" maxLength={6} pattern="[1-9][0-9]{5}" title="6-digit pincode" value={shippingAddress.postalCode} onChange={handleInputChange} required className="form-input" style={{flex: 1}} />
                </div>
                
                <div className="summary-row" style={{marginTop: '20px', padding: '15px 0', borderTop: '1px solid #eee'}}>
                  <span>Total Amount to Pay</span>
                  <span className="summary-total">₹{(
                    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) - 
                    calculateDiscountAmount(cartItems, appliedCoupon)
                  ).toLocaleString('en-IN')}</span>
                </div>

                {checkoutError && (
                  <div role="alert" style={{ padding: '12px 16px', backgroundColor: '#FFF5F5', color: '#C53030', border: '1px solid #FED7D7', borderRadius: '8px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {checkoutError}
                  </div>
                )}
                <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>Free shipping · Pay securely with UPI, cards or netbanking</p>
                <div style={{display: 'flex', gap: '15px', marginTop: '10px'}}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsCheckingOut(false)} style={{flex: 1}}>BACK TO CART</button>
                  <button type="submit" className="btn btn-primary" disabled={paymentLoading} style={{flex: 2}}>
                    {paymentLoading ? 'PROCESSING...' : 'PAY SECURELY'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <style>{`
        .cart-screen-container {
          padding: 28px 20px 100px !important;
          max-width: 1100px;
        }
        .cart-title {
          margin-bottom: 24px !important;
        }
        .cart-empty {
          padding: 56px 20px;
          text-align: center;
          border: 1px solid var(--line);
          background: #fff;
        }
        .cart-empty p {
          color: var(--ink-soft);
          margin: 0 0 20px;
          font-size: 1.05rem;
        }
        .cart-grid-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
          gap: 40px;
          align-items: start;
        }
        .cart-items-list-wrap {
          border-top: 1px solid var(--line);
        }
        .cart-item-card {
          display: flex;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid var(--line);
        }
        .cart-item-img {
          flex: 0 0 96px;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 2px;
          background: var(--paper-deep);
        }
        .cart-item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }
        .cart-item-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .item-name-link {
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.98rem;
          line-height: 1.4;
        }
        .item-name-link:hover {
          text-decoration: underline;
          text-decoration-color: var(--brass);
          text-underline-offset: 3px;
        }
        .cart-item-options {
          margin: 0;
          font-size: 0.86rem;
          color: var(--ink-soft);
        }
        .item-price {
          margin: 2px 0 0;
          font-weight: 500;
          color: var(--ink);
        }
        .cart-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding-top: 10px;
        }
        .btn-remove {
          background: none;
          border: none;
          padding: 4px 0;
          font: inherit;
          font-size: 0.88rem;
          color: var(--ink-soft);
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .btn-remove:hover {
          color: var(--ink);
        }
        .cart-summary-card,
        .checkout-form-wrap {
          background: #fff;
          border: 1px solid var(--line);
          padding: 24px;
        }
        @media (min-width: 900px) {
          .cart-summary-card {
            position: sticky;
            top: 120px;
          }
        }
        .summary-title {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.4rem;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          color: var(--ink-soft);
        }
        .summary-total {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--ink);
        }
        .form-input {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid var(--line);
          border-radius: 2px;
          font: inherit;
          font-size: 0.95rem;
          background: #fff;
          color: var(--text-primary);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--ink);
        }
        .checkout-form-wrap {
          grid-column: 1 / -1;
        }
        .checkout-form-wrap form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (max-width: 860px) {
          .cart-grid-wrap {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .cart-item-img {
            flex-basis: 84px;
          }
        }
      `}</style>
    </div>
  );
};

export default CartScreen;

