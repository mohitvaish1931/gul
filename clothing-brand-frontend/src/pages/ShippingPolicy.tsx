import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Truck, Clock, IndianRupee, AlertTriangle, Search, Mail, MessageCircle } from 'lucide-react';

const ShippingPolicy = () => {
  useSEO({
    title: 'Shipping Policy - GUL FASHION',
    description: 'Learn about our delivery times, shipping costs, and order tracking.',
    keywords: 'shipping policy, delivery time, shipping rates, track order, GUL FASHION',
    url: 'https://gulfashion.com/shipping-policy',
    type: 'website'
  });

  const sections = [
    {
      icon: <Clock size={30} />,
      title: "DELIVERY TIME",
      text: "All orders are usually dispatched within 2-3 working days unless stated otherwise. Once dispatched, it takes 4-8 working days to deliver depending upon the location.",
      note: "However, the delivery time is subject to change based on shortage of an item, bad weather, transit time of your carrier, destination address, etc."
    },
    {
      icon: <IndianRupee size={30} />,
      title: "SHIPPING COST",
      text: "We charge ₹70 per order and also offer free shipping on all orders above ₹1499. This applies to domestic shipping within India."
    },
    {
      icon: <AlertTriangle size={30} />,
      title: "RTO / UN-DELIVERED SHIPMENT",
      text: "We are not liable for undelivered shipment or RTO (Return to Origin) due to wrong address / misinformation provided while placing an order. In this case, customer has to pay the shipping charges again so we can re-ship the order."
    },
    {
      icon: <Search size={30} />,
      title: "TRACKING YOUR ORDER",
      text: "Once your order is shipped from our warehouse, you will receive an email including a tracking number to check the status. You can also use our Track Order page for real-time updates."
    },
    {
      icon: <Truck size={30} />,
      title: "LOST SHIPMENT",
      text: "Incase your package gets lost during the transit, we shall re-ship your order. If any item of your order is out of stock, you can either wait for a restock or we will issue a credit note."
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
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Shipping Policy</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Learn about our delivery times, shipping costs, and order tracking.</p>
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
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>NEED HELP?</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>Feel free to reach us out for any shipping related queries:</p>
          
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

export default ShippingPolicy;
