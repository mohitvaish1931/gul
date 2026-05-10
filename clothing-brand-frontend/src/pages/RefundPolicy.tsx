import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Package, RefreshCcw, Box, HelpCircle, Clock, Mail, MessageCircle } from 'lucide-react';

const RefundPolicy = () => {
  useSEO({
    title: 'Refund Policy - GUL FASHION',
    description: 'Understand our returns, refunds, and exchange process.',
    keywords: 'refund policy, return policy, exchange, GUL FASHION',
    url: 'https://gulfashion.com/refund-policy',
    type: 'website'
  });

  const sections = [
    {
      icon: <Package size={30} />,
      title: "RETURNS",
      text: "We accept returns only if you've received a damaged product or we have sent a different product accidentally, provided that you must have a proof of unboxing video from the start clearly showing the damage in the product. In this case, we shall arrange a pickup from your location and issue a credit note for the same which can be used for your future orders."
    },
    {
      icon: <RefreshCcw size={30} />,
      title: "REFUND",
      text: "We do not provide refunds at any cost. In some cases, you might be eligible for a credit note."
    },
    {
      icon: <Box size={30} />,
      title: "MISSING ITEM",
      text: "Incase a product is missing from your package, you can raise an issue for the same & we will ship it to you at the earliest. You must have a proof of unboxing video from the start clearly showing all the products in the package.",
      note: "Please note, we don't provide refund for the missing item. You may be eligible for a credit note if the missing item is out of stock."
    },
    {
      icon: <HelpCircle size={30} />,
      title: "EXCHANGE",
      text: "We provide size exchange only for finger rings. Shipping charges of ₹200 (to & fro) will be borne by the customer. Exchange will be picked up and delivered at the same address as the original delivery address.",
      note: "Please note that the exchange process takes around 12-15 days."
    },
    {
      icon: <Clock size={30} />,
      title: "TIME LIMIT",
      text: "You need to raise a return/exchange request within a period of 3 days from the delivery date. Post this period of 3 days, your order shall become final sale, and would not be eligible for any return request."
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
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Refund Policy</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Understand our returns, refunds, and exchange process.</p>
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
                {section.note && (
                  <p style={{ color: '#777', fontStyle: 'italic', fontSize: '0.85rem', marginTop: '10px' }}>{section.note}</p>
                )}
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
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>RAISE A REQUEST</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>You can raise a return/exchange request through the following channels:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <ContactCard 
              icon={<Mail size={24} />} 
              label="EMAIL" 
              value="gul.fashion.jaipur@gmail.com" 
              href="mailto:gul.fashion.jaipur@gmail.com"
            />
            <ContactCard 
              icon={<MessageCircle size={24} />} 
              label="WHATSAPP" 
              value="+91 93513 25459" 
              href="https://wa.me/919351325459"
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

export default RefundPolicy;
