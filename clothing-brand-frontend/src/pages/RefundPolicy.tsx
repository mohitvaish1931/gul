import React from 'react';
import { RefreshCcw, ShieldCheck, AlertCircle, Phone, Mail } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const RefundPolicy = () => {
  useSEO({
    title: 'Return & Refund Policy - GUL FASHION',
    description: 'Information about GUL FASHION return, exchange, and refund policies for luxury apparel.',
    keywords: 'return policy, refund policy, exchange, GUL FASHION, clothing returns',
    url: 'https://gulfashion.com/refund-policy',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>SERVICE & ASSURANCE</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Return & Refund</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Your satisfaction is our priority. We offer a seamless exchange policy for our handcrafted collections.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
             <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#F8F5FF', color: '#2D0A4E', padding: '15px', borderRadius: '15px' }}><RefreshCcw size={24} /></div>
                <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', fontSize: '0.9rem', marginBottom: '5px' }}>7-Day Exchange</h4>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>We offer a hassle-free 7-day exchange policy from the date of delivery.</p>
                </div>
             </div>
             <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#F8F5FF', color: '#2D0A4E', padding: '15px', borderRadius: '15px' }}><ShieldCheck size={24} /></div>
                <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', fontSize: '0.9rem', marginBottom: '5px' }}>Quality Guarantee</h4>
                  <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: '1.4' }}>Every item is triple-checked for quality before leaving our atelier.</p>
                </div>
             </div>
          </div>

          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Exchange Policy</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>We only accept exchanges in the following cases:</p>
                <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                  <li>Size issues (too small or too large).</li>
                  <li>Receipt of a damaged or defective product.</li>
                  <li>Receipt of the wrong item.</li>
                </ul>
                <p style={{ marginTop: '15px' }}>
                  To initiate an exchange, please email us at <strong>gul.fashion.jaipur@gmail.com</strong> with your order number and photos of the item within 7 days of delivery.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Refund & Credit Notes</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  As per our brand policy, we <strong>do not offer monetary refunds</strong>. Instead, we issue a <strong>Store Credit Note</strong> valid for 1 year, which can be used to purchase any other item from our collection.
                </p>
                <p style={{ marginTop: '15px' }}>
                  The store credit will be issued once the returned item passes our quality inspection at the warehouse.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Non-Returnable Items</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>The following items are not eligible for return or exchange:</p>
                <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                  <li>Custom-tailored or personalized garments.</li>
                  <li>Items purchased during a Clearance or End of Season Sale.</li>
                  <li>Items that show signs of wear, washing, or damage.</li>
                </ul>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF5F5', padding: '30px', borderRadius: '15px', border: '1px solid #FED7D7', display: 'flex', gap: '20px', alignItems: 'center' }}>
               <AlertCircle color="#C53030" size={24} />
               <p style={{ color: '#C53030', fontSize: '0.9rem', fontWeight: '600' }}>
                 Please ensure that tags are intact and the garment is in its original packaging for a successful exchange.
               </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Need an Exchange?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>Our support team is ready to help you find the perfect fit.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="mailto:gul.fashion.jaipur@gmail.com" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>EMAIL REQUEST</a>
                  <a href="https://wa.me/919351325459" style={{ padding: '15px 30px', border: '1.5px solid #2D0A4E', color: '#2D0A4E', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>WHATSAPP US</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
