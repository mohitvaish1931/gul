import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const ShippingPolicy = () => {
  useSEO({
    title: 'Shipping Policy - GUL FASHION',
    description: 'Information about GUL FASHION shipping rates, delivery times, and order tracking.',
    keywords: 'shipping policy, delivery time, shipping rates, track order, GUL FASHION',
    url: 'https://gulfashion.com/shipping-policy',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>LOGISTICS & DELIVERY</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Shipping Policy</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            We strive to deliver your handcrafted luxury apparel with the utmost care and efficiency.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
             <InfoCard 
               icon={<Clock size={24} />} 
               title="Dispatch Time" 
               desc="Orders are usually dispatched within 2-3 working days. Hand-embroidered pieces may take 5-7 days."
             />
             <InfoCard 
               icon={<Truck size={24} />} 
               title="Delivery Time" 
               desc="Once dispatched, delivery takes 4-8 working days depending on your location and courier partner."
             />
          </div>

          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <PolicySection 
              title="Shipping Costs" 
              content={
                <p>
                  We offer <strong>Free Shipping</strong> on all domestic prepaid orders within India. For orders below ₹1,499 or COD orders, a standard shipping fee of ₹70 applies.
                </p>
              } 
            />

            <PolicySection 
              title="Tracking Your Shipment" 
              content={
                <p>
                  As soon as your order leaves our Jaipur atelier, we will send you a tracking number via email and SMS. You can also track your shipment directly on our <a href="/track-order" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Track Order</a> page.
                </p>
              } 
            />

            <PolicySection 
              title="Undelivered Shipments (RTO)" 
              content={
                <p>
                  GUL FASHION is not liable for undelivered shipments due to incorrect address information provided during checkout. In the event of a Return to Origin (RTO), a re-shipping fee will be applicable.
                </p>
              } 
            />

            <PolicySection 
              title="Lost or Damaged Items" 
              content={
                <p>
                  If a package is lost in transit, we will immediately initiate a replacement shipment at no extra cost. For items damaged during transit, please record an unboxing video and contact our support team within 24 hours.
                </p>
              } 
            />

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Need Assistance?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>Our logistics concierge is available to help you with any queries regarding your delivery.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="mailto:gul.fashion.jaipur@gmail.com" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>EMAIL SUPPORT</a>
                  <a href="https://wa.me/919351325459" style={{ padding: '15px 30px', border: '1.5px solid #2D0A4E', color: '#2D0A4E', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>WHATSAPP US</a>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 768px) {
          .policy-page h1 {
            font-size: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const InfoCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0', display: 'flex', gap: '20px', alignItems: 'center' }}>
    <div style={{ backgroundColor: '#F8F5FF', color: '#2D0A4E', padding: '15px', borderRadius: '15px' }}>{icon}</div>
    <div>
      <h4 style={{ fontWeight: '800', color: '#2D0A4E', fontSize: '0.9rem', marginBottom: '5px' }}>{title}</h4>
      <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>{desc}</p>
    </div>
  </div>
);

const PolicySection = ({ title, content }: { title: string, content: React.ReactNode }) => (
  <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
    <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>{title}</h3>
    <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
      {content}
    </div>
  </div>
);

export default ShippingPolicy;

