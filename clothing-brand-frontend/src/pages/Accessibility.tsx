import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Eye, ShieldCheck, Globe, Users, Headphones, Mail } from 'lucide-react';

const Accessibility = () => {
  useSEO({
    title: 'Accessibility Statement - GUL FASHION',
    description: 'Our commitment to making our website accessible to everyone.',
    keywords: 'accessibility, inclusive design, GUL FASHION accessibility',
    url: 'https://gulfashion.com/accessibility',
    type: 'website'
  });

  const sections = [
    {
      icon: <Users size={30} />,
      title: "OUR COMMITMENT",
      text: "At GUL FASHION, we are committed to ensuring that our website is accessible to the widest possible audience, regardless of technology or ability. We are actively working to increase the usability of our website and adhere to available standards."
    },
    {
      icon: <Globe size={30} />,
      title: "STANDARDS & GUIDELINES",
      text: "We aim to comply with all relevant accessibility standards, including the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1. These guidelines explain how to make web content more accessible for people with disabilities."
    },
    {
      icon: <Eye size={30} />,
      title: "ACCESSIBILITY FEATURES",
      text: "We use semantic HTML, proper contrast ratios, and keyboard navigation features to ensure a seamless experience. Our team is trained on accessibility best practices to incorporate them into our digital presence."
    },
    {
      icon: <Headphones size={30} />,
      title: "FEEDBACK",
      text: "We welcome your feedback on the accessibility of our website. If you encounter any barriers or have suggestions on how we can improve, please reach out to us."
    }
  ];

  return (
    <div className="policy-page-v2" style={{ 
      backgroundColor: '#fff', 
      color: '#2d0a4e', 
      minHeight: '100vh', 
      padding: '80px 20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Accessibility</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Our commitment to making our website accessible to everyone.</p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px' }}>
          {sections.map((section, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '30px', 
              padding: '30px', 
              backgroundColor: '#fff', 
              borderRadius: '20px', 
              boxShadow: '0 5px 25px rgba(0,0,0,0.03)',
              border: '1px solid #f8f8f8',
              alignItems: 'flex-start'
            }}>
              <div style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                backgroundColor: '#FDF7F2', 
                color: '#2d0a4e', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {section.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '1px', marginBottom: '12px', color: '#2d0a4e' }}>{section.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.95rem' }}>{section.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Raise a Request */}
        <div style={{ 
          backgroundColor: '#F9F6FF', 
          borderRadius: '24px', 
          padding: '60px 40px', 
          textAlign: 'center'
        }}>
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>EXPERIENCING DIFFICULTIES?</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>If you encounter any difficulty in accessing our website, please let us know:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <ContactCard 
              icon={<Mail size={24} />} 
              label="EMAIL" 
              value="gul.fashion.jaipur@gmail.com" 
              href="mailto:gul.fashion.jaipur@gmail.com"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .policy-page-v2 h1 { font-size: 2.5rem !important; }
          .policy-page-v2 h2 { font-size: 2rem !important; }
          .policy-page-v2 > div > div:nth-child(2) > div { flex-direction: column; align-items: center; text-align: center; }
        }
      `}</style>
    </div>
  );
};

const ContactCard = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) => (
  <a href={href} style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    padding: '25px 40px', 
    backgroundColor: '#fff', 
    borderRadius: '16px', 
    textDecoration: 'none', 
    color: '#2d0a4e',
    boxShadow: '0 10px 20px rgba(0,0,0,0.02)',
    minWidth: '320px',
    border: '1px solid #f0f0f0'
  }}>
    <div style={{ color: '#2d0a4e', backgroundColor: '#F9F6FF', padding: '12px', borderRadius: '12px' }}>{icon}</div>
    <div style={{ textAlign: 'left' }}>
      <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#999', display: 'block' }}>{label}</span>
      <span style={{ fontSize: '1rem', fontWeight: '700' }}>{value}</span>
    </div>
  </a>
);

export default Accessibility;
