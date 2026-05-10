import React from 'react';
import { Eye, ShieldCheck, Globe, Users, Headphones } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const Accessibility = () => {
  useSEO({
    title: 'Accessibility Statement - GUL FASHION',
    description: 'Learn about GUL FASHION\'s commitment to digital accessibility and inclusive shopping experiences.',
    keywords: 'accessibility, inclusive design, web accessibility, GUL FASHION statement',
    url: 'https://gulfashion.com/accessibility',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>INCLUSIVE DESIGN</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Accessibility</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            We are dedicated to ensuring that luxury and elegance are accessible to everyone.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Our Commitment</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  At GUL FASHION, we believe that everyone should be able to enjoy our collections and our digital presence. We are committed to ensuring that our website is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the accessibility and usability of our website and adhere to many of the available standards and guidelines.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Standard & Guidelines</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  Our goal is to follow the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible for people with disabilities. We strive to maintain Level AA compliance across our digital platforms.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Accessibility Features</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
                  <li><strong>Semantic HTML:</strong> Proper use of headers and landmarks for screen reader navigation.</li>
                  <li><strong>Contrast Ratios:</strong> Ensuring text is readable against various background colors.</li>
                  <li><strong>Keyboard Navigation:</strong> Fully accessible menu and checkout process using only a keyboard.</li>
                  <li><strong>Alt Text:</strong> Providing descriptive text for all visual elements.</li>
                </ul>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Experiencing Difficulties?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>If you encounter any difficulty in accessing any part of this website, please let us know. We are here to assist you.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="mailto:gul.fashion.jaipur@gmail.com" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>EMAIL ASSISTANCE</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accessibility;
