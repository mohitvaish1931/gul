import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

interface HeroProps {
  products?: any[];
}

const Hero = ({ products = [] }: HeroProps) => {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dynamic slides from database collections with array checks
  const list = Array.isArray(products) ? products : [];
  const suitsProduct = list.find(p => p.category === 'Suit Sets');
  const kurtaProduct = list.find(p => p.category === 'Kurta Sets');
  const topsProduct = list.find(p => p.category === 'Tops & Co-ord Sets');
  const threePieceProduct = list.find(p => p.category === 'Shrug Sets');

  const slides = [
    {
      type: 'image',
      src: threePieceProduct?.image || '/images/hero-banner.png',
      title: threePieceProduct ? threePieceProduct.name : 'Premium Shrug Ensembles',
      subtitle: threePieceProduct ? threePieceProduct.description : 'Exquisite three-piece shrug sets handcrafted for daily comfort and elegance',
      btnPrimary: 'EXPLORE SHRUG SETS',
      btnOutline: 'OUR COLLECTION',
      link: threePieceProduct ? `/product/${threePieceProduct._id}` : '/shop?category=Shrug%20Sets'
    },
    {
      type: 'image',
      src: suitsProduct?.image || '/images/hero-banner.png',
      title: suitsProduct ? suitsProduct.name : 'Designer Suit Sets',
      subtitle: suitsProduct ? suitsProduct.description : 'Jaipur hand-block prints and hand-embroidered suit sets with dupattas',
      btnPrimary: 'SHOP SUIT SETS',
      btnOutline: 'OUR STORY',
      link: suitsProduct ? `/product/${suitsProduct._id}` : '/shop?category=Suit%20Sets'
    },
    {
      type: 'image',
      src: topsProduct?.image || kurtaProduct?.image || '/images/clothing_rack_hero.png',
      title: topsProduct ? topsProduct.name : (kurtaProduct ? kurtaProduct.name : 'Chic Co-ord Ensembles'),
      subtitle: topsProduct ? topsProduct.description : (kurtaProduct ? kurtaProduct.description : 'Contemporary cuts, breathable fabrics, and elegant block print patterns'),
      btnPrimary: 'EXPLORE STYLES',
      btnOutline: 'SHOP ALL',
      link: topsProduct ? `/product/${topsProduct._id}` : (kurtaProduct ? `/product/${kurtaProduct._id}` : '/shop')
    }
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => console.log('Autoplay blocked', err));
    }
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, idx) => (
          <div key={idx} className={`hero-slide ${idx === current ? 'active' : ''}`}>
            {slide.type === 'video' ? (
              <video 
                ref={idx === current ? videoRef : null}
                src={slide.src} 
                className="hero-media hero-video" 
                autoPlay 
                loop 
                muted={true}
                playsInline
              />
            ) : (
              <img 
                src={slide.src} 
                alt={slide.title} 
                className="hero-media hero-image" 
                fetchpriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            )}
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-gold-tag animate-item">THE LUXURY EDIT</span>
              <h1 className="hero-title font-serif animate-item">
                <span className="title-bold">{slide.title.split(' ')[0]}</span>{' '}
                <span className="title-italic font-serif" style={{color: 'var(--gold-primary)'}}>
                  {slide.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="hero-subtitle animate-item" style={{ maxWidth: '800px', margin: '0 auto 45px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {slide.subtitle}
              </p>
              <div className="hero-actions animate-item">
                <Link to={slide.link} className="hero-btn hero-btn-primary">{slide.btnPrimary}</Link>
                <Link to="/about" className="hero-btn hero-btn-outline">{slide.btnOutline}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider dots */}
      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            className={`hero-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
