import React, { useState } from 'react';
import { Search, Truck, AlertCircle, Loader2, Package, Mail, Headphones, ShieldCheck, RefreshCcw, Globe, Lock } from 'lucide-react';
import { useSEO } from '../utils/useSEO';
import { API_ENDPOINTS, fetchJSON } from '../utils/api';
import './TrackOrder.css';

interface OrderTrackingResponse {
  success: boolean;
  order: {
    _id: string;
    orderNumber: string;
    status: string;
    createdAt: string;
    totalAmount: number;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    courierName?: string;
    awbNumber?: string;
  };
}

const TrackOrder = () => {
  useSEO({
    title: 'Track Your Order - GUL FASHION',
    description: 'Track your GUL FASHION clothing order in real-time. Get live updates on your shipment status.',
    keywords: 'track order, clothing delivery status, gul fashion tracking',
    url: 'https://gulfashion.com/track-order',
    type: 'website'
  });

  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingResult, setTrackingResult] = useState<OrderTrackingResponse | null>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrackingResult(null);

    try {
      const data = await fetchJSON<OrderTrackingResponse>(API_ENDPOINTS.ORDERS.TRACK, {
        method: 'POST',
        body: JSON.stringify({ orderNumber, email }),
      });

      if (data.success) {
        setTrackingResult(data);
      } else {
        setError('Order not found. Please check your order number and email.');
      }
    } catch (err: any) {
      console.error('Tracking error:', err);
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page-v2" style={{ backgroundColor: '#FDFBFD', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>REAL-TIME UPDATES</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', color: '#2D0A4E', marginBottom: '20px' }}>Track Your Order</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
            Enter your order details below to see the current status of your handcrafted apparel.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
        {/* Tracking Card */}
        <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
          <form onSubmit={handleTrackOrder} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px', color: '#2D0A4E', marginBottom: '10px', textTransform: 'uppercase' }}>ORDER ID</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }}>
                  <Package size={20} />
                </div>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  style={{ width: '100%', padding: '18px 20px 18px 55px', borderRadius: '15px', border: '1.5px solid #eee', backgroundColor: '#fafafa', outline: 'none', transition: 'all 0.3s' }}
                  placeholder="e.g. MOR-123456"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px', color: '#2D0A4E', marginBottom: '10px', textTransform: 'uppercase' }}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }}>
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '18px 20px 18px 55px', borderRadius: '15px', border: '1.5px solid #eee', backgroundColor: '#fafafa', outline: 'none', transition: 'all 0.3s' }}
                  placeholder="The email used during checkout"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '20px', 
                backgroundColor: '#2D0A4E', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '15px', 
                fontWeight: '800', 
                letterSpacing: '2px', 
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(45,10,78,0.1)'
              }}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              {loading ? 'LOCATING...' : 'TRACK MY SHIPMENT'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '15px', color: '#C53030', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AlertCircle size={20} />
              <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{error}</p>
            </div>
          )}
        </div>

        {/* Result Card */}
        {trackingResult && (
          <div style={{ marginTop: '40px', backgroundColor: '#2D0A4E', color: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 30px 60px rgba(45,10,78,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '3px', opacity: 0.6, textTransform: 'uppercase' }}>Shipment Status</span>
                  <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px' }}>{trackingResult.order.status}</h2>
                </div>
                <Truck size={40} color="#D4AF37" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: '700', letterSpacing: '2px', opacity: 0.5, textTransform: 'uppercase' }}>Order Number</span>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500', marginTop: '5px' }}>{trackingResult.order.orderNumber}</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: '700', letterSpacing: '2px', opacity: 0.5, textTransform: 'uppercase' }}>Courier Partner</span>
                  <p style={{ fontSize: '1.2rem', fontWeight: '500', marginTop: '5px' }}>{trackingResult.order.courierName || 'In Transit'}</p>
                </div>
              </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .track-order-page-v2 h1 { font-size: 2.5rem !important; }
          .track-order-page-v2 > div:nth-child(2) { padding: 40px 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default TrackOrder;
