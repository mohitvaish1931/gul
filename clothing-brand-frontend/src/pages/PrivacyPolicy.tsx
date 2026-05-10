import React from 'react';
import { useSEO } from '../utils/useSEO';
import { ShieldCheck, Eye, Lock, FileText, Globe, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  useSEO({
    title: 'Privacy Policy - GUL FASHION',
    description: 'Learn how GUL FASHION protects your personal data.',
    keywords: 'privacy policy, data protection, GUL FASHION privacy',
    url: 'https://gulfashion.com/privacy-policy',
    type: 'website'
  });

  const sections = [
    {
      icon: <Eye size={30} />,
      title: "INFORMATION WE COLLECT",
      text: "We collect personal information such as your name, email address, phone number, and shipping address when you place an order. We also collect device data like IP addresses to improve site performance."
    },
    {
      icon: <FileText size={30} />,
      title: "HOW WE USE YOUR DATA",
      text: "Your data is used to process orders, provide tracking updates, and offer personalized styling recommendations. We may also use it to improve our website experience and customer service."
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "DATA PROTECTION",
      text: "We implement robust security measures to protect your personal information. Your data is stored on secure servers and only accessible by authorized personnel for order fulfillment."
    },
    {
      icon: <Lock size={30} />,
      title: "COOKIES",
      text: "We use cookies to save your preferences for future visits and compile aggregate data about site traffic. This helps us offer better site experiences and tools in the future."
    },
    {
      icon: <Globe size={30} />,
      title: "THIRD-PARTY DISCLOSURE",
      text: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted partners who assist us in operating our website and conducting our business."
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
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Privacy Policy</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Learn how GUL FASHION protects your personal data and privacy.</p>
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
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>PRIVACY CONCERNS?</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>Contact our privacy team for any questions regarding your data:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <ContactCard 
              icon={<Mail size={24} />} 
              label="EMAIL" 
              value="privacy@gulfashion.com" 
              href="mailto:privacy@gulfashion.com"
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

export default PrivacyPolicy;
