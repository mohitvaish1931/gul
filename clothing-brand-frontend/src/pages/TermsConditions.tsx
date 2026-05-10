import React from 'react';
import { Scale, FileText, ShieldAlert, Gavel, HelpCircle } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const TermsConditions = () => {
  useSEO({
    title: 'Terms & Conditions - GUL FASHION',
    description: 'Read the terms and conditions for using the GUL FASHION website and purchasing our luxury collections.',
    keywords: 'terms and conditions, legal, GUL FASHION terms, user agreement',
    url: 'https://gulfashion.com/terms-conditions',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>LEGAL FRAMEWORK</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Terms & Conditions</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Please read these terms carefully before using our website or placing an order.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Acceptance of Terms</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Product Representation</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  We make every effort to display as accurately as possible the colors and images of our products. However, we cannot guarantee that your computer monitor's display of any color will be accurate. Handcrafted items may have slight variations in embroidery or weave, which are hallmarks of authenticity.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Intellectual Property</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  All content included on this site, such as text, graphics, logos, images, and software, is the property of GUL FASHION or its content suppliers and protected by international copyright laws. Any unauthorized use of the content is strictly prohibited.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Pricing & Payments</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice. We shall not be liable to you or to any third-party for any modification, price change, or suspension of the Service.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Governing Law</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of Rajasthan, India, and you irrevocably submit to the exclusive jurisdiction of the courts in Jaipur.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Legal Questions?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>If you have any questions about our Terms & Conditions, please reach out to our legal department.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="mailto:legal@gulfashion.com" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>CONTACT LEGAL TEAM</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
