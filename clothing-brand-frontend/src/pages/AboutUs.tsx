import React from 'react';
import { useSEO } from '../utils/useSEO';
import { ShieldCheck, Globe, Award, Lock, RefreshCcw } from 'lucide-react';

const AboutUs = () => {
  useSEO({
    title: 'Our Story - GUL FASHION Jaipur',
    description: 'The story of GUL FASHION, a Jaipur store for ethnic wear for women since 2005.',
    keywords: 'about us, brand story, clothing heritage, craftsmanship, GUL FASHION Jaipur, ethnic wear for women',
    url: 'https://gulfashion.store/about',
    type: 'website'
  });

  return (
    <div className="about-page" style={{ backgroundColor: '#FDFBFD', color: '#1a1a1a' }}>
      {/* Hero Section */}
      <section className="about-hero" style={{ 
        position: 'relative', 
        padding: '120px 20px', 
        backgroundColor: '#2D0A4E', 
        color: '#fff', 
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.2) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <span style={{ color: 'var(--brass)', letterSpacing: '6px', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>ESTABLISHED 2005</span>
          <h1 className="font-serif" style={{ fontSize: '4.5rem', marginBottom: '30px', lineHeight: '1' }}>The Soul of <br /><i style={{ color: 'var(--brass)' }}>Gul Fashion</i></h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            Where ancient Jaipur artistry meets contemporary silhouettes. We don't just create apparel; we weave heirlooms for your most precious moments.
          </p>
        </div>
      </section>

      {/* Our Heritage Section */}
      <section style={{ padding: '100px 20px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', 
              height: '600px', 
              borderRadius: '20px', 
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="/images/bridal-edit.png" 
                alt="Jaipur Heritage" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ 
              position: 'absolute', 
              bottom: '-30px', 
              right: '-30px', 
              backgroundColor: '#fff', 
              padding: '40px', 
              borderRadius: '20px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              maxWidth: '250px'
            }}>
              <h3 className="font-serif" style={{ color: '#2D0A4E', fontSize: '1.5rem', marginBottom: '10px' }}>21 Years</h3>
              <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.5' }}>Of preserving the intricate Zari and Gota Patti traditions of Rajasthan.</p>
            </div>
          </div>

          <div>
            <span className="small-gold-tag">OUR HERITAGE</span>
            <h2 className="font-serif" style={{ fontSize: '3rem', color: '#2D0A4E', marginBottom: '30px' }}>Born in the <br /> Pink City</h2>
            <p style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '25px' }}>
              Gul Fashion began in Jaipur in 2005. Named after the "Gul" (rose) that colours the Pink City, the store has been dressing women in comfortable ethnic wear ever since.
            </p>
            <p style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '35px' }}>
              Today we offer kurta sets, suit sets, tops and gowns in cotton, rayon and Roman silk, in printed, embroidered and bandhani styles, and every piece is checked at our Sanganer store before it ships.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
               <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', marginBottom: '10px' }}>Checked before dispatch</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Every piece is checked at our Jaipur store before it ships.</p>
               </div>
               <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', marginBottom: '10px' }}>Free delivery in India</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Shipping is free on every order delivered within India.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <StatItem number="2005" label="Established in Jaipur" />
          <StatItem number="Free" label="Delivery across India" />
          <StatItem number="7 days" label="Size exchange" />
          <StatItem number="1 store" label="Sanganer, Jaipur" />
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '100px 20px', backgroundColor: '#F8F5FF' }}>
        <div className="container text-center" style={{ marginBottom: '60px', maxWidth: '1200px', margin: '0 auto 60px' }}>
          <span className="small-gold-tag">THE GUL ETHOS</span>
          <h2 className="font-serif" style={{ fontSize: '3rem', color: '#2D0A4E' }}>What We Stand For</h2>
        </div>
        
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          <ValueCard 
            icon={<Award size={32} />} 
            title="Clear Product Details" 
            desc="Every product page lists the fabric, neckline, sleeves and what comes in the set, so you know exactly what you are buying."
          />
          <ValueCard 
            icon={<ShieldCheck size={32} />} 
            title="Jaipur Prints" 
            desc="Sanganeri, bandhani and buti prints inspired by the traditions of Rajasthan, alongside embroidered festive sets."
          />
          <ValueCard 
            icon={<Globe size={32} />} 
            title="Everyday Comfort" 
            desc="Breathable cottons and easy cuts for college, the office and family functions."
          />
        </div>
      </section>

      {/* Trust Bar Footer */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid #eee', padding: '80px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
              <TrustItem icon={<ShieldCheck size={28} />} title="QUALITY CHECKED" sub="Every piece checked before dispatch" />
              <TrustItem icon={<Lock size={28} />} title="SECURE PAYMENTS" sub="Encrypted checkout by Razorpay" />
              <TrustItem icon={<RefreshCcw size={28} />} title="7-DAY EXCHANGE" sub="Size exchange on unworn items" />
              <TrustItem icon={<Globe size={28} />} title="FREE SHIPPING" sub="Free delivery across India" />
          </div>
        </div>
      </section>
      
      <style>{`
        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2.8rem !important;
          }
          .about-hero {
            padding: 80px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

const StatItem = ({ number, label }: { number: string, label: string }) => (
  <div>
    <h3 className="font-serif" style={{ fontSize: '3rem', color: '#2D0A4E', marginBottom: '5px' }}>{number}</h3>
    <p style={{ color: 'var(--brass)', fontWeight: '700', letterSpacing: '2px', fontSize: '0.7rem', textTransform: 'uppercase' }}>{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', transition: 'all 0.3s' }}>
    <div style={{ color: 'var(--brass)', marginBottom: '25px' }}>{icon}</div>
    <h4 className="font-serif" style={{ fontSize: '1.5rem', color: '#2D0A4E', marginBottom: '15px' }}>{title}</h4>
    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '0.95rem' }}>{desc}</p>
  </div>
);

const TrustItem = ({ icon, title, sub }: { icon: React.ReactNode, title: string, sub: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ color: '#2D0A4E', opacity: 0.8 }}>{icon}</div>
    <div style={{ textAlign: 'left' }}>
      <h5 style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', color: '#2D0A4E', marginBottom: '2px' }}>{title}</h5>
      <p style={{ fontSize: '0.65rem', color: '#888' }}>{sub}</p>
    </div>
  </div>
);

export default AboutUs;
