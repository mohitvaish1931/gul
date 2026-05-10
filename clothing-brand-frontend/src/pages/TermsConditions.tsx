import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Scale, FileText, ShieldAlert, Gavel, HelpCircle, Mail, MessageCircle } from 'lucide-react';

const TermsConditions = () => {
  useSEO({
    title: 'Terms & Conditions - GUL FASHION',
    description: 'Read the terms and conditions for using the GUL FASHION website.',
    keywords: 'terms and conditions, legal, GUL FASHION terms',
    url: 'https://gulfashion.com/terms-conditions',
    type: 'website'
  });

  const sections = [
    {
      icon: <Scale size={30} />,
      title: "ACCEPTANCE OF TERMS",
      text: "By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site."
    },
    {
      icon: <FileText size={30} />,
      title: "PRODUCT REPRESENTATION",
      text: "We make every effort to display product colors and images as accurately as possible. However, we cannot guarantee your monitor's display will be accurate. Handcrafted items may have slight variations, which are hallmarks of authenticity."
    },
    {
      icon: <ShieldAlert size={30} />,
      title: "INTELLECTUAL PROPERTY",
      text: "All content on this site, including text, graphics, logos, and images, is the property of GUL FASHION. Any unauthorized use or reproduction of this content is strictly prohibited."
    },
    {
      icon: <Gavel size={30} />,
      title: "PRICING & PAYMENTS",
      text: "Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service at any time. We are not liable for any price changes or suspensions."
    },
    {
      icon: <HelpCircle size={30} />,
      title: "GOVERNING LAW",
      text: "These terms and conditions are governed by and construed in accordance with the laws of Rajasthan, India. You irrevocably submit to the exclusive jurisdiction of the courts in Jaipur."
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
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Terms & Conditions</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Please read these terms carefully before using our website or placing an order.</p>
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
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>LEGAL QUESTIONS?</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>If you have any questions about our Terms & Conditions, please reach out to our legal team:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <ContactCard 
              icon={<Mail size={24} />} 
              label="EMAIL" 
              value="legal@gulfashion.com" 
              href="mailto:legal@gulfashion.com"
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

export default TermsConditions;
