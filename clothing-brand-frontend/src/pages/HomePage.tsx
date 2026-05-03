import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error('Failed to grab products');
      }
    };
    fetchProducts();
  }, []);

  const TrustBadges = () => (
    <div className="trust-badges-section">
      <div className="container">
        <div className="badges-grid">
          <div className="badge-item">
            <h4 className="badge-title font-serif">OUR STORES</h4>
            <p className="badge-desc">Jaipur, Delhi, Mumbai, Global</p>
          </div>
          <div className="badge-item">
            <h4 className="badge-title font-serif">FREE SHIPPING</h4>
            <p className="badge-desc">On domestic prepaid orders</p>
          </div>
          <div className="badge-item">
            <h4 className="badge-title font-serif">EASY EXCHANGE</h4>
            <p className="badge-desc">7 Days exchange</p>
          </div>
          <div className="badge-item">
            <h4 className="badge-title font-serif">STYLING CONCIERGE</h4>
            <p className="badge-desc">Personal advice via WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CarouselSection = ({ tag, titleLight, titleItalic, subtext, items }: any) => (
    <section className="carousel-section container section">
      <div className="carousel-header flex justify-between items-center" style={{marginBottom: '40px'}}>
        <div>
          <span className="small-gold-tag">{tag}</span>
          <h2 className="title" style={{fontSize: '2.5rem'}}><span style={{fontWeight: 700}}>{titleLight}</span> <i className="font-serif text-primary" style={{color: 'var(--primary-color)'}}>{titleItalic}</i></h2>
          {subtext && <p className="subtext mt-2 text-gray-500 font-serif">{subtext}</p>}
        </div>
        <Link to="/shop" className="view-all-link">VIEW ALL</Link>
      </div>
      
      <div className="products-carousel-grid">
        {items.map((product: any) => (
          <div key={product._id} className="carousel-product-card">
            <Link to={`/product/${product._id}`}>
              <div className="carousel-img-wrapper">
                <img src={product.image} alt={product.name} />
              </div>
            </Link>
            <div className="carousel-product-details">
              <Link to={`/product/${product._id}`}><h3 className="cp-name">{product.name}</h3></Link>
              <p className="cp-price">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="homepage-wrapper">
      <Hero />
      <div style={{marginTop: '40px'}}></div>
      
      <div className="container text-center" style={{marginBottom: '40px'}}>
        <span className="small-gold-tag text-center" style={{display: 'inline-block'}}>CURATED FOR YOU</span>
      </div>
      <Categories />

      <CarouselSection 
        tag="JUST IN" 
        titleLight="NEW" 
        titleItalic="ARRIVALS" 
        subtext="Handpicked for this season"
        items={products} 
      />

      <section className="bridal-edit-section">
        <div className="bridal-split">
          <div className="bridal-img-side">
            <img src="/images/bridal-edit.png" alt="Bridal Edit 2026" />
          </div>
          <div className="bridal-content-side">
            <span className="gold-capsule">THE BRIDAL EDIT 2026</span>
            <h2 className="font-serif bridal-title">Dressed for Your<br/>Most Precious Moments</h2>
            
            <div className="bridal-stats-grid">
              <div className="stat-item">
                <h3 className="font-serif" style={{color: 'var(--secondary-color)', fontSize: '2rem'}}>100K+</h3>
                <p>HAPPY CLIENTS</p>
              </div>
              <div className="stat-item">
                <h3 className="font-serif" style={{color: 'var(--secondary-color)', fontSize: '2rem'}}>2000+</h3>
                <p>UNIQUE DESIGNS</p>
              </div>
              <div className="stat-item">
                <h3 className="font-serif" style={{color: 'var(--secondary-color)', fontSize: '2rem'}}>21 <span style={{fontSize: '1rem'}}>Yrs</span></h3>
                <p>OF GUL FASHION</p>
              </div>
            </div>
            
            <p className="bridal-desc">
              Experience the royal legacy of Jaipur's intricate craftsmanship, where every thread weaves a tale of timeless beauty, creating heirlooms meant to be treasured forever.
            </p>
          </div>
        </div>
      </section>

      <CarouselSection 
        tag="BEST SELLING CATEGORY" 
        titleLight="SAREES" 
        titleItalic="BY GUL" 
        items={products.filter(p => p.category === 'Sarees')} 
      />

      <TrustBadges />

      <CarouselSection 
        tag="TOP CATEGORY" 
        titleLight="SUITS" 
        titleItalic="BY GUL" 
        items={products.filter(p => p.category === 'Suits')} 
      />

      <section className="shop-by-craft container section">
        <span className="small-gold-tag">SHOP BY CRAFT</span>
        <div className="craft-grid" style={{marginTop: '20px'}}>
          {['Bandhej', 'Embroidery', 'Handloom', 'Prints'].map((craft, i) => (
             <div className="craft-card" key={craft}>
               <div className="craft-img-wrapper" style={{backgroundColor: '#e9e9e9'}}>
                  {/* Using generic placeholders for the craft representations */}
                  <img src={i % 2 === 0 ? '/images/saree-category.png' : '/images/kurta-category.png'} alt={craft} />
               </div>
               <span className="craft-number">0{i+1}</span>
               <h3 className="craft-name font-serif">{craft}</h3>
             </div>
          ))}
        </div>
      </section>

      <section className="store-locator-banner" style={{backgroundImage: 'url(/images/store-locator.png)'}}>
        <div className="store-locator-overlay">
          <div className="store-locator-content text-center">
            <h2 className="title font-serif" style={{color: 'var(--text-primary)', fontSize: '3.5rem', marginBottom: '20px'}}>Find Your Perfect Look, <i style={{color: 'var(--primary-red)'}}>In-Store</i></h2>
            <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '30px'}}>Discover elegance firsthand at our exclusive boutique showrooms.</p>
            <button className="btn btn-primary" style={{padding: '15px 40px'}}>FIND YOUR NEAREST STORE</button>
          </div>
        </div>
      </section>

      <section className="worn-with-love container section">
        <h2 className="title text-center font-serif" style={{fontSize: '3rem', margin: '40px 0'}}>Worn with <i style={{color: 'var(--primary-color)'}}>Love</i></h2>
        <div className="social-proof-grid">
           {[...Array(4)].map((_, i) => (
             <div className="social-card" key={i}>
                <img src={`/images/${i % 2 === 0 ? 'saree-category' : 'kurta-category'}.png`} alt="Social Proof" />
                <div className="social-hover">Instagram ♥ 1.2k</div>
             </div>
           ))}
        </div>
      </section>

      <section className="featured-in text-center section" style={{backgroundColor: '#f8f8f8'}}>
        <span className="small-gold-tag">FEATURED IN</span>
        <div className="featured-logos flex justify-center items-center" style={{gap: '60px', marginTop: '30px', opacity: 0.6, filter: 'grayscale(100%)'}}>
          <h3 className="font-serif text-xl">VOGUE</h3>
          <h3 className="font-serif text-xl">ELLE</h3>
          <h3 className="font-serif text-xl">COSMOPOLITAN</h3>
          <h3 className="font-serif text-xl">FEMINA</h3>
        </div>
      </section>

      <section className="testimonials text-center section container" style={{padding: '80px 0'}}>
        <h2 className="title font-serif" style={{fontSize: '2.5rem', marginBottom: '40px'}}>What Our <i style={{color: 'var(--primary-color)'}}>Patrons Say</i></h2>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
           <p className="font-serif italic" style={{fontSize: '1.5rem', lineHeight: '1.8', color: '#444'}}>
             "The craftsmanship is unparalleled. I wore a GUL FASHION lehenga for my wedding and it made me feel like royalty. Every thread is intricately woven with magic."
           </p>
           <p style={{marginTop: '20px', letterSpacing: '2px', fontWeight: 'bold'}}>- PRIYANKA SHARMA</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
