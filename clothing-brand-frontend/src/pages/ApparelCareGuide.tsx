import React from 'react';
import { Sparkles, Archive, Wind, Droplets, Info } from 'lucide-react';
import { useSEO } from '../utils/useSEO';

const ApparelCareGuide = () => {
  useSEO({
    title: 'Garment Care Guide - GUL FASHION',
    description: 'Expert tips on preserving the life and beauty of your luxury handcrafted ethnic wear.',
    keywords: 'garment care, clothing maintenance, silk care, embroidery care, GUL FASHION guide',
    url: 'https://gulfashion.com/apparel-care-guide',
    type: 'website'
  });

  return (
    <div className="policy-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ backgroundColor: '#2D0A4E', color: '#fff', padding: '100px 20px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>HEIRLOOM PRESERVATION</span>
          <h1 className="font-serif" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Garment Care Guide</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Gul Fashion garments are masterpieces of artistry. Follow these expert tips to ensure they last for generations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '950px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
             <CareCard 
               icon={<Droplets size={24} />} 
               title="Professional Cleaning" 
               desc="Most of our ethnic wear requires professional dry cleaning only. Avoid machine or hand washing."
             />
             <CareCard 
               icon={<Archive size={24} />} 
               title="Ideal Storage" 
               desc="Store in breathable muslin or cotton bags. Avoid plastic covers which can cause yellowing."
             />
             <CareCard 
               icon={<Sparkles size={24} />} 
               title="Usage Tips" 
               desc="Apply perfumes and jewelry before putting on your garment to avoid stains and snags."
             />
          </div>

          <div className="policy-sections" style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Cleaning & Maintenance</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  High-end fabrics like <strong>Pure Silk, Chanderi, and Organza</strong> are extremely delicate. We recommend <strong>Petrol Wash or Dry Clean</strong> only. Inform your dry cleaner about the Zari or Gota Patti work to ensure appropriate chemical usage.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Perfect Storage</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  Heavy lehengas and sarees should be folded with the embroidery on the <strong>inside</strong> to prevent metal threads from oxidizing or snagging. Change the fold lines every 3 months to prevent fabric stress and tearing. Use cedar balls or dried neem leaves for natural pest protection.
                </p>
              </div>
            </div>

            <div style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '30px' }}>
              <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Ironing & Steaming</h3>
              <div style={{ color: '#444', lineHeight: '1.8', fontSize: '1.05rem' }}>
                <p>
                  Always iron on the <strong>reverse side</strong> using a low heat setting. For heavily embellished pieces, <strong>Vertical Steamers</strong> are preferred. Ensure the steamer head does not touch the embroidery directly.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FDF7E6', padding: '30px', borderRadius: '15px', border: '1px solid #F6E05E', display: 'flex', gap: '20px', alignItems: 'center' }}>
               <Info color="#B7791F" size={24} />
               <p style={{ color: '#744210', fontSize: '0.9rem', fontWeight: '600' }}>
                 Pro Tip: Never pull a loose thread. Always use a small pair of scissors to carefully snip it.
               </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', marginTop: '40px', textAlign: 'center' }}>
               <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '20px' }}>Specific Care Inquiry?</h3>
               <p style={{ color: '#666', marginBottom: '30px' }}>Have a question about a specific fabric or outfit? Our styling concierge is here to help.</p>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <a href="https://wa.me/919351325459" style={{ padding: '15px 30px', backgroundColor: '#2D0A4E', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem' }}>CHAT ON WHATSAPP</a>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CareCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '20px', border: '1px solid #f0f0f0', textAlign: 'center' }}>
    <div style={{ color: '#D4AF37', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <h4 style={{ fontWeight: '800', color: '#2D0A4E', fontSize: '1rem', marginBottom: '10px' }}>{title}</h4>
    <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>{desc}</p>
  </div>
);

export default ApparelCareGuide;
