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
    <div className="track-order-page">
      {/* Hero Section */}
      <section className="track-hero text-center">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="small-gold-tag" style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: 'bold' }}>REAL-TIME UPDATES</span>
          <h1 className="font-serif">Track Your Order</h1>
          
          <div className="flex justify-center items-center" style={{ margin: '20px 0' }}>
            <div style={{ height: '1px', width: '60px', backgroundColor: '#D4AF37', opacity: 0.3 }}></div>
            <div style={{ margin: '0 20px' }}><Truck size={24} color="#D4AF37" style={{ opacity: 0.5 }} /></div>
            <div style={{ height: '1px', width: '60px', backgroundColor: '#D4AF37', opacity: 0.3 }}></div>
          </div>

          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Enter your order details below to see the current status of your handcrafted apparel.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ maxWidth: '700px', margin: '60px auto' }}>
        {/* Tracking Card */}
        <div className="tracking-card">
          <form onSubmit={handleTrackOrder} className="flex flex-col" style={{ gap: '30px' }}>
            <div className="input-group">
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px', color: '#2D0A4E', marginBottom: '10px', textTransform: 'uppercase' }}>Order ID</label>
              <div className="relative" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }}>
                  <Package size={20} />
                </div>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  style={{ width: '100%', padding: '18px 20px 18px 55px', borderRadius: '15px', border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', transition: 'all 0.3s' }}
                  placeholder="e.g. MOR-123456"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px', color: '#2D0A4E', marginBottom: '10px', textTransform: 'uppercase' }}>Email Address</label>
              <div className="relative" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#D4AF37' }}>
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '18px 20px 18px 55px', borderRadius: '15px', border: '1px solid #e0e0e0', backgroundColor: '#fafafa', outline: 'none', transition: 'all 0.3s' }}
                  placeholder="The email used during checkout"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '20px', borderRadius: '15px', fontSize: '0.9rem', letterSpacing: '3px' }}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} style={{ marginRight: '10px' }} />}
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
          <div className="animate-fade-in" style={{ marginTop: '40px' }}>
            <div className="result-card-container">
              <div className="flex justify-between items-start flex-wrap" style={{ marginBottom: '30px', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '3px', opacity: 0.6, textTransform: 'uppercase' }}>Shipment Status</span>
                  <h2 className="font-serif" style={{ fontSize: '2.5rem', marginTop: '10px' }}>{trackingResult.order.status}</h2>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '20px' }}>
                  <Truck size={36} color="#D4AF37" />
                </div>
              </div>

              <div className="result-grid">
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
          </div>
        )}

        {/* Need Help Section */}
        <div className="help-section text-center" style={{ marginTop: '100px' }}>
          <h3 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '50px' }}>Need Help?</h3>
          
          <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <HelpCard icon={<Headphones size={24} />} title="Contact Us" desc="Our support team is ready to assist you." />
            <HelpCard icon={<Truck size={24} />} title="Shipping Info" desc="Everything you need to know about delivery." />
            <HelpCard icon={<Package size={24} />} title="Returns" desc="Hassle-free 7-day exchange policy." />
            <HelpCard icon={<ShieldCheck size={24} />} title="Secure Payments" desc="Your data is protected and encrypted." />
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f0f0f0', padding: '60px 0', marginTop: '100px' }}>
        <div className="container">
           <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '40px', textAlign: 'center' }}>
              <TrustItem icon={<ShieldCheck size={20} />} title="PREMIUM QUALITY" />
              <TrustItem icon={<Lock size={20} />} title="SECURE PAYMENTS" />
              <TrustItem icon={<RefreshCcw size={20} />} title="EASY RETURNS" />
              <TrustItem icon={<Globe size={20} />} title="WORLDWIDE SHIPPING" />
           </div>
        </div>
      </div>
    </div>
  );
};

const HelpCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '25px', border: '1px solid #f0f0f0', textAlign: 'left', transition: 'all 0.3s' }}>
    <div style={{ width: '50px', height: '50px', backgroundColor: '#f5f0ff', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#2D0A4E', marginBottom: '20px' }}>
      <div style={{ margin: '0 auto' }}>{icon}</div>
    </div>
    <h4 className="font-serif" style={{ fontSize: '1.2rem', color: '#2D0A4E', marginBottom: '10px' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>{desc}</p>
    <a href="#" style={{ fontSize: '0.7rem', fontWeight: '800', color: '#D4AF37', textDecoration: 'none', letterSpacing: '1px' }}>LEARN MORE →</a>
  </div>
);

const TrustItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex flex-col items-center" style={{ gap: '10px' }}>
    <div style={{ color: '#D4AF37', marginBottom: '5px' }}>{icon}</div>
    <h5 style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', color: '#2D0A4E' }}>{title}</h5>
  </div>
);

export default TrackOrder;

