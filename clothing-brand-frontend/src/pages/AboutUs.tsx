import React from 'react';
import { useSEO } from '../utils/useSEO';
import { Heart, ShieldCheck, Globe, Star, Award, Users } from 'lucide-react';

const AboutUs = () => {
  useSEO({
    title: 'Our Story - GUL FASHION Jaipur',
    description: 'Experience the regal legacy of GUL FASHION. Handcrafted elegance from the heart of Jaipur since 2005.',
    keywords: 'about us, brand story, clothing heritage, craftsmanship, GUL FASHION Jaipur, luxury ethnic wear',
    url: 'https://gulfashion.com/about-us',
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
          <span style={{ color: '#D4AF37', letterSpacing: '6px', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>ESTABLISHED 2005</span>
          <h1 className="font-serif" style={{ fontSize: '4.5rem', marginBottom: '30px', lineHeight: '1' }}>The Soul of <br /><i style={{ color: '#D4AF37' }}>Gul Fashion</i></h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            Where ancient Jaipur artistry meets contemporary silhouettes. We don't just create apparel; we weave heirlooms for your most precious moments.
          </p>
        </div>
      </section>

      {/* Our Heritage Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '80px', alignItems: 'center' }}>
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
              Gul Fashion was born amidst the vibrant hues and architectural splendor of Jaipur. Inspired by the "Gul" (Rose) that characterizes the city's palette, our journey began with a vision to bring royal Rajputana aesthetics to the modern woman.
            </p>
            <p style={{ color: '#444', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '35px' }}>
              Every stitch in a Gul Fashion garment is a tribute to the master craftsmen of Rajasthan, whose hands carry the legacy of centuries. We pride ourselves on being a bridge between tradition and the future.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
               <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', marginBottom: '10px' }}>100% Handcrafted</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Meticulously detailed by master artisans in our Jaipur atelier.</p>
               </div>
               <div>
                  <h4 style={{ fontWeight: '800', color: '#2D0A4E', marginBottom: '10px' }}>Ethical Fashion</h4>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Fair wages and sustainable practices at every stage of creation.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0', borderY: '1px solid #f0f0f0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <StatItem number="100K+" label="Happy Patrons" />
          <StatItem number="2000+" label="Unique Designs" />
          <StatItem number="50+" label="Global Stores" />
          <StatItem number="21" label="Years of Legacy" />
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#F8F5FF' }}>
        <div className="container text-center" style={{ marginBottom: '60px' }}>
          <span className="small-gold-tag">THE GUL ETHOS</span>
          <h2 className="font-serif" style={{ fontSize: '3rem', color: '#2D0A4E' }}>What We Stand For</h2>
        </div>
        
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <ValueCard 
            icon={<Award size={32} />} 
            title="Premium Quality" 
            desc="We use only the finest silks, linens, and hand-woven fabrics, ensuring every piece feels as good as it looks."
          />
          <ValueCard 
            icon={<ShieldCheck size={32} />} 
            title="Authentic Artistry" 
            desc="From Zardosi to Bandhani, we preserve the authentic techniques of Indian craftsmanship without compromise."
          />
          <ValueCard 
            icon={<Globe size={32} />} 
            title="Modern Heritage" 
            desc="Designing for the global woman who respects her roots but embraces contemporary fashion sensibilities."
          />
        </div>
      </section>

      {/* Founders Section or Quote */}
      <section style={{ padding: '120px 0', textAlign: 'center', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px', color: '#D4AF37' }}>
            <Star size={40} fill="#D4AF37" />
          </div>
          <h2 className="font-serif italic" style={{ fontSize: '2.5rem', lineHeight: '1.6', color: '#2D0A4E', marginBottom: '40px' }}>
            "Fashion is a language that tells the story of who you are. At Gul Fashion, we want that story to be one of elegance, grace, and timeless beauty."
          </h2>
          <div style={{ height: '2px', width: '60px', backgroundColor: '#D4AF37', margin: '0 auto 20px' }}></div>
          <p style={{ fontWeight: '800', letterSpacing: '4px', color: '#2D0A4E' }}>THE GUL FAMILY</p>
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
    <p style={{ color: '#D4AF37', fontWeight: '700', letterSpacing: '2px', fontSize: '0.7rem', textTransform: 'uppercase' }}>{label}</p>
  </div>
);

const ValueCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #f0f0f0', transition: 'all 0.3s' }}>
    <div style={{ color: '#D4AF37', marginBottom: '25px' }}>{icon}</div>
    <h4 className="font-serif" style={{ fontSize: '1.5rem', color: '#2D0A4E', marginBottom: '15px' }}>{title}</h4>
    <p style={{ color: '#666', lineHeight: '1.8', fontSize: '0.95rem' }}>{desc}</p>
  </div>
);

export default AboutUs;

