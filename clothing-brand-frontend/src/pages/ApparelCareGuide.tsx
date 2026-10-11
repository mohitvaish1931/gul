import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Sparkles, Archive, Droplets, Info, Wind, MessageCircle } from 'lucide-react';

const ApparelCareGuide = () => {
  useSEO({
    title: 'Garment Care Guide - GUL FASHION',
    description: 'How to wash, iron and store your cotton, rayon and silk ethnic wear.',
    keywords: 'garment care, clothing maintenance, silk care, embroidery care, GUL FASHION guide',
    url: 'https://gulfashion.store/care-guide',
    type: 'website'
  });

  const sections = [
    {
      icon: <Droplets size={30} />,
      title: "WASHING",
      text: "Cotton and rayon pieces can be hand washed in cold water with a mild detergent. Wash dark and printed colours separately, and do not wring rayon. Roman silk and heavily embroidered sets are best dry cleaned.",
      note: "Check the care instructions on each product page before washing."
    },
    {
      icon: <Archive size={30} />,
      title: "STORAGE",
      text: "Store your clothes in breathable cotton or muslin bags rather than plastic covers, which trap moisture and cause yellowing. Refold heavier sets every few months so the creases do not set."
    },
    {
      icon: <Wind size={30} />,
      title: "IRONING & STEAMING",
      text: "Iron on the reverse side on a low-to-medium setting. Steam works well for rayon and silk; keep the iron off embroidery and mirror work."
    },
    {
      icon: <Sparkles size={30} />,
      title: "USAGE & MAINTENANCE",
      text: "Avoid spraying perfumes or deodorants directly onto your clothes, as chemicals can stain the fabric and darken metal threads. Apply perfumes and jewelry before putting on your garment."
    },
    {
      icon: <Info size={30} />,
      title: "SPECIFIC CARE",
      text: "If a thread comes loose, never pull it. Snip it carefully with small scissors. Dry printed cottons in the shade to keep the colours bright."
    }
  ];

  return (
    <div className="policy-page-v2" style={{ 
      backgroundColor: '#fff', 
      color: '#2d0a4e', 
      minHeight: '100vh', 
      padding: '80px 20px',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '15px', color: '#2d0a4e' }}>Garment Care Guide</h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--brass)', margin: '0 auto 20px' }}></div>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Keep your ethnic wear looking new with these simple tips.</p>
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
          <h2 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#2d0a4e' }}>NEED ADVICE?</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--brass)', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#666', marginBottom: '40px' }}>Our styling experts are here to help you preserve your heirloom pieces:</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <ContactCard 
              icon={<MessageCircle size={24} />} 
              label="WHATSAPP CONCIERGE" 
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

export default ApparelCareGuide;
