import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Truck, RefreshCcw, MessageCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/api';
import { getImageUrl } from '../utils/mediaHelper';
import { estimateDelivery } from '../utils/delivery';
import { useSEO } from '../utils/useSEO';

interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
  product: string;
}

interface Order {
  _id: string;
  createdAt: string;
  orderItems: OrderItem[];
  shippingAddress: { name?: string; email?: string; city?: string; postalCode?: string };
  discountAmount?: number;
  totalPrice: number;
  isPaid: boolean;
}

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: 'Order Confirmed | Gul Fashion',
    description: 'Thank you for shopping with Gul Fashion.',
    url: 'https://gulfashion.store/order',
    noindex: true,
  });

  useEffect(() => {
    let active = true;
    fetch(`${API_ENDPOINTS.ORDERS.BASE}/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Order not found');
        if (active) setOrder(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => { active = false; };
  }, [id]);

  if (error) {
    return (
      <div className="container page-top-padding" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 className="font-serif" style={{ color: '#2D0A4E', fontSize: '2rem', marginBottom: '12px' }}>We couldn't load this order</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>{error}. Your order history is always available in My Account.</p>
        <Link to="/profile" className="btn btn-primary">Go to My Account</Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 0' }}>
        <div style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
      </div>
    );
  }

  const orderNumber = `#${order._id.substring(0, 8)}`;
  const delivery = estimateDelivery(order.shippingAddress?.postalCode, new Date(order.createdAt));

  return (
    <div className="order-success-page" style={{ backgroundColor: '#FDFBFD', minHeight: '80vh', padding: '60px 16px 100px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <CheckCircle2 size={56} color="#15803D" strokeWidth={1.5} style={{ marginBottom: '16px' }} />
          <span style={{ display: 'block', color: '#D4AF37', letterSpacing: '4px', fontWeight: 800, fontSize: '0.7rem', marginBottom: '10px' }}>ORDER CONFIRMED</span>
          <h1 className="font-serif" style={{ color: '#2D0A4E', fontSize: '2.4rem', margin: '0 0 12px' }}>
            Thank you{order.shippingAddress?.name ? `, ${order.shippingAddress.name.split(' ')[0]}` : ''}!
          </h1>
          <p style={{ color: '#555', lineHeight: 1.7, margin: 0 }}>
            Your order <strong>{orderNumber}</strong> has been placed.
            {order.shippingAddress?.email && <> A confirmation has been sent to <strong>{order.shippingAddress.email}</strong>.</>}
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #f0e8f7', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '18px', marginBottom: '8px', borderBottom: '1px solid #f3f3f3' }}>
            <Truck size={22} color="#D4AF37" />
            <div>
              <div style={{ fontWeight: 700, color: '#2D0A4E' }}>Estimated delivery: {delivery.label}</div>
              <div style={{ fontSize: '0.85rem', color: '#777' }}>
                Shipping to {order.shippingAddress?.city}{order.shippingAddress?.postalCode ? ` - ${order.shippingAddress.postalCode}` : ''} · Free shipping
              </div>
            </div>
          </div>

          {order.orderItems.map((item, idx) => (
            <div key={`${item.product}-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid #f7f7f7' }}>
              <img src={getImageUrl(item.image, 200)} alt={item.name} style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link to={`/product/${item.product}`} style={{ color: '#2D0A4E', fontWeight: 600, textDecoration: 'none' }}>{item.name}</Link>
                <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                  Qty {item.qty}{item.selectedSize ? ` · Size ${item.selectedSize}` : ''}{item.selectedColor ? ` · ${item.selectedColor}` : ''}
                </div>
              </div>
              <div style={{ fontWeight: 700, color: '#2D0A4E', whiteSpace: 'nowrap' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}

          {Boolean(order.discountAmount) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', color: '#15803D' }}>
              <span>Discount</span><span>-₹{order.discountAmount!.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontWeight: 800, color: '#2D0A4E', fontSize: '1.1rem' }}>
            <span>Total paid</span><span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#fff', border: '1px solid #f0e8f7', borderRadius: '14px', padding: '16px', fontSize: '0.85rem', color: '#555' }}>
            <RefreshCcw size={18} color="#D4AF37" style={{ flexShrink: 0 }} />
            <span>Wrong size? Request an exchange from My Account within 7 days of delivery.</span>
          </div>
          <a href="https://wa.me/919351325459" target="_blank" rel="noreferrer" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#fff', border: '1px solid #f0e8f7', borderRadius: '14px', padding: '16px', fontSize: '0.85rem', color: '#555', textDecoration: 'none' }}>
            <MessageCircle size={18} color="#D4AF37" style={{ flexShrink: 0 }} />
            <span>Questions about your order? Chat with us on WhatsApp.</span>
          </a>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/profile" className="btn btn-outline">View My Orders</Link>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
