import React from 'react';
import { Lock, Eye, ShieldCheck, FileText, Globe } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy - GUL FASHION',
    description: 'Learn how GUL FASHION protects your personal data and ensures a secure shopping experience.',
    keywords: 'privacy policy, data protection, secure shopping, GUL FASHION privacy',
    url: 'https://gulfashion.com/privacy-policy',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>TRUST & SECURITY</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Privacy Policy</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            We are committed to protecting your privacy and ensuring your personal information is handled with care.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Information We Collect</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>When you visit GUL FASHION, we collect certain information to provide you with a personalized experience:</p>
                <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                  <li><strong>Personal Details:</strong> Name, email address, phone number, and shipping address provided during checkout.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, and operating system to improve our website performance.</li>
                  <li><strong>Transaction Details:</strong> History of products purchased (we do not store credit card details).</li>
                </ul>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>How We Use Your Data</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>Your data helps us serve you better in the following ways:</p>
                <ul style={{ listStyle: 'disc', marginLeft: '20px', marginTop: '10px' }}>
                  <li>To process and fulfill your orders efficiently.</li>
                  <li>To send order updates and tracking information.</li>
                  <li>To provide personalized styling recommendations and exclusive offers.</li>
                  <li>To improve our website's user interface and overall experience.</li>
                </ul>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Data Protection</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is accessible only by a limited number of persons who have special access rights to such systems.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Cookies</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Privacy Concerns?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>If you have any questions regarding this privacy policy, you may contact us using the information below.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="mailto:privacy@gulfashion.com" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>CONTACT PRIVACY TEAM</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
