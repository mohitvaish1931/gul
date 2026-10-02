import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/mediaHelper';
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
  const topsProduct = list.find(p => p.category === 'Tops');

  // Editorial headlines (first word bold, rest in gold italic); product photos come from the catalog
  let slides = [
    suitsProduct ? {
      type: 'image',
      src: suitsProduct.image,
      title: 'The Festive Edit',
      subtitle: 'Hand-finished angrakha suit sets in breathable cotton, made in Jaipur for every celebration.',
      btnPrimary: 'Shop suit sets',
      btnOutline: 'Our story',
      link: '/shop?category=Suit%20Sets'
    } : null,
    kurtaProduct ? {
      type: 'image',
      src: kurtaProduct.image,
      title: 'Everyday Elegance',
      subtitle: 'Comfortable cotton kurta sets with the details that make a simple day feel special.',
      btnPrimary: 'Shop kurta sets',
      btnOutline: 'Our story',
      link: '/shop?category=Kurta%20Sets'
    } : null,
    topsProduct ? {
      type: 'image',
      src: topsProduct.image,
      title: 'Easy Cotton Tops',
      subtitle: 'Printed tops and short kurtis for college, work and weekends.',
      btnPrimary: 'Shop tops',
      btnOutline: 'Our story',
      link: '/shop?category=Tops'
    } : null
  ].filter(Boolean) as any[];

  // Fallback slide to ensure instant LCP render even while API is fetching
  if (slides.length === 0) {
    slides = [{
      type: 'image',
      src: 'https://res.cloudinary.com/drjnbrsfj/image/upload/v1783939676/gul_fashion/products/xa5thpgio3ny1i3pkfm8.jpg',
      title: 'Premium Suit Sets',
      subtitle: 'Experience the royal legacy of Jaipur craftsmanship.',
      btnPrimary: 'Shop suit sets',
      btnOutline: 'Our story',
      link: `/shop?category=Suit%20Sets`
    }];
  }

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

  if (slides.length === 0) return null;

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
                src={getImageUrl(slide.src, 1200)} 
                srcSet={`${getImageUrl(slide.src, 600)} 600w, ${getImageUrl(slide.src, 1200)} 1200w, ${getImageUrl(slide.src, 1920)} 1920w`}
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1200px, 1920px"
                alt="" 
                className="hero-media hero-image" 
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding={idx === 0 ? "sync" : "async"}
              />
            )}
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h2 className="hero-title font-serif animate-item">{slide.title}</h2>
              <p className="hero-subtitle animate-item">{slide.subtitle}</p>
              <div className="hero-actions animate-item">
                <Link to={slide.link} className="hero-btn hero-btn-primary">{slide.btnPrimary}</Link>
                <Link to="/about" className="hero-link">{slide.btnOutline}</Link>
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
