import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CircleCategories from '../components/CircleCategories';
import { API_ENDPOINTS } from '../utils/api';
import { useSEO } from '../utils/useSEO';
import WishlistButton from '../components/WishlistButton';
import FeaturedReviews from '../components/FeaturedReviews';
import { splitProductName } from '../utils/productName';
import { OCCASIONS } from '../utils/occasions';
import { getImageUrl } from '../utils/mediaHelper';
import { Truck, RefreshCcw, ShieldCheck, MessageCircle } from 'lucide-react';
import './HomePage.css';

// Defined outside HomePage so they aren't recreated (and remounted) on every render

const TRUST_POINTS = [
  { icon: Truck, title: 'Free shipping', text: 'On every order across India' },
  { icon: RefreshCcw, title: '7-day size exchange', text: 'Request it from My Account' },
  { icon: ShieldCheck, title: 'Secure payments', text: 'UPI, cards and netbanking' },
  { icon: MessageCircle, title: 'Styling help', text: 'Ask us anything on WhatsApp' },
];

const TrustBadges = () => (
  <section className="trust-row container" aria-label="Why shop with us">
    {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
      <div key={title} className="trust-point">
        <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
        <div>
          <p className="trust-title">{title}</p>
          <p className="trust-text">{text}</p>
        </div>
      </div>
    ))}
  </section>
);

interface RailProps {
  title: string;
  subtext?: string;
  items: any[];
  viewAllLink?: string;
}

// A row of product cards: a grid on desktop, a swipeable row on phones
const ProductRail = ({ title, subtext, items, viewAllLink = '/shop' }: RailProps) => (
  <section className="rail container">
    <div className="rail-header">
      <div>
        <h2 className="section-heading">{title}</h2>
        {subtext && <p className="section-subtext">{subtext}</p>}
      </div>
      <Link to={viewAllLink} className="view-all-link">View all</Link>
    </div>

    <div className="products-carousel-grid">
      {items.map((product: any) => {
        const discount = product.originalPrice && product.price && product.originalPrice > product.price
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0;
        const { title: name } = splitProductName(product.name);

        return (
          <article key={product._id} className="carousel-product-card">
            <Link to={`/product/${product._id}`} className="carousel-img-wrapper" aria-label={name}>
              <img src={getImageUrl(product.image, 600)} alt={name} className="primary-img" loading="lazy" />
              {product.images && product.images.length > 1 && (
                <img src={getImageUrl(product.images[1], 600)} alt="" className="secondary-img" loading="lazy" />
              )}
              {discount > 0 && <span className="discount-badge">{discount}% off</span>}
            </Link>
            <WishlistButton product={product} size={16} className="card-wishlist" />
            <div className="carousel-product-details">
              <Link to={`/product/${product._id}`} className="cp-name">{name}</Link>
              <p className="cp-price">
                ₹{product.price.toLocaleString('en-IN')}
                {discount > 0 && <s className="cp-mrp">₹{product.originalPrice.toLocaleString('en-IN')}</s>}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

// Occasion collections, framed in the jharokha arch used across the store's navigation
const ShopByOccasion = ({ products }: { products: any[] }) => {
  const tiles = OCCASIONS.map((occasion) => ({
    ...occasion,
    image: products.find((p) => occasion.match.test(p.name))?.image,
  })).filter((tile) => tile.image);

  if (tiles.length === 0) return null;

  return (
    <section className="occasions container">
      <div className="rail-header">
        <div>
          <h2 className="section-heading">Shop by occasion</h2>
          <p className="section-subtext">From festive evenings to everyday errands.</p>
        </div>
      </div>
      <div className="occasion-grid">
        {tiles.map((tile) => (
          <Link key={tile.key} to={`/shop?occasion=${tile.key}`} className="occasion-tile">
            <span className="arch-frame">
              <img src={getImageUrl(tile.image!, 600)} alt="" loading="lazy" />
            </span>
            <span className="occasion-label">{tile.label}</span>
            <span className="occasion-tagline">{tile.tagline}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Brand story with facts the store can stand behind
const StoryBand = ({ image, designCount }: { image?: string; designCount: number }) => (
  <section className="story-band">
    {image && (
      <div className="story-media">
        <img src={getImageUrl(image, 1000)} alt="A Gul Fashion suit set" loading="lazy" />
      </div>
    )}
    <div className="story-copy">
      <h2 className="section-heading">Designed and finished in Jaipur</h2>
      <p className="story-text">
        Every piece is made at our studio in Pahadiya Chowk — breathable cottons, angrakha ties and
        embroidery finished by hand, so what arrives at your door feels as good as it looks.
      </p>
      <dl className="story-facts">
        <div><dt>2005</dt><dd>Established in Jaipur</dd></div>
        <div><dt>{designCount > 0 ? designCount : '100+'}</dt><dd>Designs online</dd></div>
        <div><dt>7 days</dt><dd>Size exchange</dd></div>
      </dl>
      <Link to="/about" className="text-link">Read our story</Link>
    </div>
  </section>
);

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data;
        // Reuse the early prefetch started in index.html
        if (window.__PRODUCTS_PROMISE__) {
          data = await window.__PRODUCTS_PROMISE__;
          window.__PRODUCTS_PROMISE__ = null; // Clear it so it's not reused on re-renders
        }
        
        if (!data) {
          const res = await fetch(API_ENDPOINTS.PRODUCTS);
          data = await res.json();
        }

        const productsArray = Array.isArray(data) ? data : (data.products || []);
        
        if (productsArray.length >= 0) {
          setProducts(productsArray);
          setError(null);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.error('Failed to grab products', e);
        setProducts([]);
        setError('Our server is currently starting up. Please refresh the page in a few seconds.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useSEO({
    title: "Gul Fashion | Premium Women's Ethnic & Casual Wear",
    description: "Shop the latest trends in women's ethnic and casual wear at Gul Fashion. Explore our wide collection of Kurtis, Tops, Co-ord sets, and more with premium quality.",
    url: 'https://gulfashion.store/',
    type: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gul Fashion',
      url: 'https://gulfashion.store',
      logo: 'https://gulfashion.store/favicon.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9351325459',
        contactType: 'customer service',
        email: 'gul.fashion.jaipur@gmail.com',
      },
    },
  });

  const homepageProducts = products.filter(p => p.showOnHomepage !== false);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#FDFBFD', padding: '20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif, serif)', color: '#C53030', marginBottom: '15px' }}>Store is waking up</h2>
        <p style={{ color: '#666', marginBottom: '30px', maxWidth: '400px', lineHeight: '1.6' }}>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">Refresh Page</button>
      </div>
    );
  }

  // Sort by createdAt descending to show latest arrivals
  const newArrivals = [...homepageProducts]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 8);

  const kurtaSets = homepageProducts
    .filter(p => p.category === 'Kurta Sets')
    .slice(0, 8);

  const suitSets = homepageProducts
    .filter(p => p.category === 'Suit Sets')
    .slice(0, 8);

  const topsCoOrds = homepageProducts
    .filter(p => p.category === 'Tops')
    .slice(0, 8);


  const maxisDresses = homepageProducts
    .filter(p => p.category === 'Maxis & Dresses')
    .slice(0, 8);

  // Removed full-page blocking loader to drastically improve FCP and LCP
  // Components will handle their own empty/loading states

  return (
    <div className="homepage-wrapper">
      <h1 className="sr-only">Gul Fashion – Premium Women's Ethnic &amp; Casual Wear from Jaipur</h1>
      <CircleCategories products={homepageProducts} />
      
      <Hero products={homepageProducts} />
      
      <div style={{marginTop: '45px'}}></div>
      
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
          <div style={{ border: '3px solid #f3f3f3', borderTop: '3px solid var(--primary-purple, #2D0A4E)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <ProductRail title="New arrivals" subtext="The latest pieces from our Jaipur studio." items={newArrivals} viewAllLink="/shop" />
          )}

          <ShopByOccasion products={homepageProducts} />

          <StoryBand image={suitSets[0]?.image || kurtaSets[0]?.image} designCount={products.length} />

          {kurtaSets.length > 0 && (
            <ProductRail title="Kurta sets" items={kurtaSets} viewAllLink="/shop?category=Kurta%20Sets" />
          )}

          {suitSets.length > 0 && (
            <ProductRail title="Suit sets" items={suitSets} viewAllLink="/shop?category=Suit%20Sets" />
          )}

          <TrustBadges />

          {topsCoOrds.length > 0 && (
            <ProductRail title="Tops and short kurtis" items={topsCoOrds} viewAllLink="/shop?category=Tops" />
          )}

          {maxisDresses.length > 0 && (
            <ProductRail title="Maxis and dresses" items={maxisDresses} viewAllLink="/shop?category=Maxis%20%26%20Dresses" />
          )}

          <FeaturedReviews />

          <section className="studio-band">
            <div className="studio-band-inner container">
              <h2 className="section-heading">Visit our Jaipur studio</h2>
              <p>455, Mandhi Khatikan, Pahadiya Chowk, Jaipur 302002. See the fabrics in person and get help with sizing.</p>
              <div className="studio-actions">
                <a href="https://www.google.com/maps/search/?api=1&query=455+Mandhi+Khatikan+Pahadiya+Chowk+Jaipur+302002" target="_blank" rel="noreferrer" className="btn btn-light">Get directions</a>
                <a href="https://wa.me/919351325459" target="_blank" rel="noreferrer" className="text-link text-link-light">Message us before you visit</a>
              </div>
            </div>
          </section>
        </>
      )}

    </div>
  );
};

export default HomePage;
