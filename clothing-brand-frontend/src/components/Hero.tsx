import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-slider">
        <div className="hero-slide active">
          <video 
            ref={videoRef}
            src="/Video_Combination_and_Sync.mp4" 
            className="hero-image" 
            autoPlay 
            loop 
            muted={true}
            playsInline
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in font-serif">Regal <span style={{color: 'var(--accent-purple)'}}>Elegance</span></h1>
            <p className="hero-subtitle animate-fade-in" style={{animationDelay: '0.2s'}}>
              Discover our latest collection of handcrafted bridal and festive wear
            </p>
            <div className="hero-actions animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link to="/shop" className="hero-btn hero-btn-primary">EXPLORE COLLECTION</Link>
              <Link to="/about" className="hero-btn hero-btn-outline">OUR HERITAGE</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
