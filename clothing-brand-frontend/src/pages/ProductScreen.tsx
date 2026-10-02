import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductStyles.css';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Star, BadgeCheck, MapPin } from 'lucide-react';
import WishlistButton from '../components/WishlistButton';
import { splitProductName } from '../utils/productName';
import { addRecentlyViewed, useRecentlyViewed } from '../utils/savedProducts';
import { estimateDelivery, isValidPincode } from '../utils/delivery';
import { API_ENDPOINTS, API_BASE_URL } from '../utils/api';
import { getImageUrl } from '../utils/mediaHelper';
import { useAppContext } from '../context/AppContext';
import { useSEO } from '../utils/useSEO';

// Helper component for star ratings
const StarRating = ({ rating, size = 16, interactive = false, onChange }: { rating: number, size?: number, interactive?: boolean, onChange?: (r: number) => void }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  return (
    <div style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = hoverRating !== null ? star <= hoverRating : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(null)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: interactive ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: fill ? 'var(--brass)' : '#E2E8F0',
              transition: 'color 0.1s ease',
              outline: 'none'
            }}
          >
            <Star size={size} fill={fill ? 'var(--brass)' : 'none'} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
};

const ReviewsTab = ({ productId }: { productId: string }) => {
  const { state } = useAppContext();
  const [reviews, setReviews] = useState<any[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<any>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Review Form State
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formImages, setFormImages] = useState<File[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!productId) return;
    let active = true;
    fetch(`${API_BASE_URL}/api/reviews/product/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setReviews(data.reviews || []);
        setTotalReviews(data.totalReviews || 0);
        setRatingDistribution(data.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
      })
      .catch((err) => {
        console.error(err);
        if (active) setError(err.message || 'Error loading reviews');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [productId, reloadKey]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formComment.trim()) {
      setSubmitError('Please fill out all fields');
      return;
    }
    
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // multipart so customers can attach photos
      const body = new FormData();
      body.append('productId', productId);
      body.append('rating', String(formRating));
      body.append('title', formTitle);
      body.append('comment', formComment);
      formImages.forEach((file) => body.append('images', file));

      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        body,
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to submit review');
      }

      setSubmitSuccess(true);
      setFormTitle('');
      setFormComment('');
      setFormRating(5);
      setFormImages([]);
      // Refresh list
      setReloadKey((key) => key + 1);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {totalReviews > 0 && (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Rating Summary */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500, marginBottom: '15px' }}>Average rating</h4>
          <span style={{ fontSize: '3.5rem', fontWeight: '800', color: '#2D0A4E', display: 'block', lineHeight: '1' }}>{averageRating}</span>
          <div style={{ margin: '10px 0' }}>
            <StarRating rating={Math.round(parseFloat(averageRating))} size={20} />
          </div>
          <span style={{ color: '#888', fontSize: '0.85rem' }}>Based on {totalReviews} reviews</span>
        </div>

        {/* Rating Breakdown */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 500, marginBottom: '15px' }}>Rating breakdown</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingDistribution[stars] || 0;
              const percent = getPercentage(count);
              return (
                <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                  <span style={{ width: '45px', color: '#2D0A4E', fontWeight: '700' }}>{stars} Star</span>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, backgroundColor: 'var(--brass)', borderRadius: '4px' }}></div>
                  </div>
                  <span style={{ width: '30px', color: '#888', textAlign: 'right' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      )}

      {/* Write a Review Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
        <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', margin: 0 }}>Customer reviews</h3>
        {!writeReviewOpen && (
          <button
            onClick={() => setWriteReviewOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2D0A4E',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '800',
              fontSize: '0.8rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(45,10,78,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Write a review
          </button>
        )}
      </div>

      {/* Review Writing Form */}
      {writeReviewOpen && (
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #f0f0f0', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h4 style={{ fontSize: '1.2rem', color: '#2D0A4E', fontWeight: '800', letterSpacing: '1px' }}>Share your experience</h4>
            <button 
              onClick={() => { setWriteReviewOpen(false); setSubmitSuccess(false); setSubmitError(null); }}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}
            >
              &times;
            </button>
          </div>

          {!state.user ? (
            <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#FDFBFD', borderRadius: '16px', border: '1px dashed #ddd' }}>
              <p style={{ color: '#666', marginBottom: '20px' }}>You must be signed in to submit a product review.</p>
              <Link
                to="/login"
                style={{
                  display: 'inline-block',
                  padding: '12px 30px',
                  backgroundColor: '#2D0A4E',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '800',
                  fontSize: '0.8rem',
                  letterSpacing: '1px'
                }}
              >
                Sign in to review
              </Link>
            </div>
          ) : submitSuccess ? (
            <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#F0FDF4', color: '#15803D', borderRadius: '16px', border: '1px solid #BBF7D0' }}>
              <p style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '10px' }}>Review Submitted Successfully!</p>
              <p style={{ fontSize: '0.9rem' }}>Thank you for sharing your feedback. Your review has been submitted and is pending administrator approval.</p>
            </div>
          ) : (
            <form onSubmit={handleReviewSubmit}>
              {submitError && (
                <div style={{ padding: '12px 20px', backgroundColor: '#FFF5F5', color: '#C53030', borderRadius: '8px', border: '1px solid #FED7D7', marginBottom: '20px', fontSize: '0.85rem' }}>
                  {submitError}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>Your rating</label>
                <StarRating rating={formRating} size={24} interactive={true} onChange={setFormRating} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>Review title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beautiful fabric and fit!"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>Your review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your review here. What did you like or dislike? How was the sizing?"
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  style={{ width: '100%', padding: '14px 18px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none', fontSize: '0.95rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label htmlFor="review-photos" style={{ display: 'block', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#2D0A4E', letterSpacing: '1px' }}>Add photos (optional, up to 3)</label>
                <input
                  id="review-photos"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).slice(0, 3);
                    const tooBig = files.find((f) => f.size > 5 * 1024 * 1024);
                    setSubmitError(tooBig ? 'Each photo must be under 5 MB' : null);
                    setFormImages(tooBig ? [] : files);
                  }}
                  style={{ fontSize: '0.9rem' }}
                />
                {formImages.length > 0 && (
                  <p style={{ fontSize: '0.8rem', color: '#666', margin: '6px 0 0' }}>{formImages.length} photo{formImages.length > 1 ? 's' : ''} selected</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#2D0A4E',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '800',
                  letterSpacing: '1.5px',
                  cursor: submitLoading ? 'not-allowed' : 'pointer',
                  opacity: submitLoading ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(45,10,78,0.1)'
                }}
              >
                {submitLoading ? 'Submitting...' : 'Submit review'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '30px' }}>
          <div className="loader-spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
        </div>
      ) : error ? (
        <p style={{ color: '#C53030', textAlign: 'center' }}>Error loading reviews: {error}</p>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', border: '1px dashed #eee', borderRadius: '12px' }}>
          <p style={{ color: '#666', fontSize: '1rem', margin: 0 }}>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {reviews.map((rev: any) => (
            <div key={rev._id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <h5 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#2D0A4E', margin: '0 0 5px' }}>{rev.title}</h5>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <StarRating rating={rev.rating} size={14} />
                    <span style={{ fontSize: '0.85rem', color: '#2D0A4E', fontWeight: '700' }}>by {rev.userName || 'Anonymous'}</span>
                    {rev.verified && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.8rem', color: '#15803D', fontWeight: 600 }}>
                        <BadgeCheck size={14} /> Verified buyer
                      </span>
                    )}
                  </div>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>{new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.95rem', margin: 0 }}>{rev.comment}</p>
              {rev.images && rev.images.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {rev.images.map((img: string) => (
                    <a key={img} href={img} target="_blank" rel="noreferrer">
                      <img src={getImageUrl(img, 300)} alt={`Photo from ${rev.userName || 'a customer'}`} style={{ width: '90px', height: '110px', objectFit: 'cover', borderRadius: '10px' }} loading="lazy" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // Selection states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // Delivery estimate (pincode is remembered for next time)
  const [pincode, setPincode] = useState(() => {
    try { return localStorage.getItem('gul_pincode') || ''; } catch { return ''; }
  });
  const [checkedPincode, setCheckedPincode] = useState(() => (isValidPincode(pincode) ? pincode : ''));
  const [pincodeError, setPincodeError] = useState('');

  // Back-in-stock alert
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyState, setNotifyState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const recentlyViewed = useRecentlyViewed().filter((p) => p._id !== id).slice(0, 6);

  // Phones: show a sticky "Add to bag" bar once the main button scrolls out of view
  const addToBagRef = useRef<HTMLButtonElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const button = addToBagRef.current;
    if (!button || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(button);
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.PRODUCTS}/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.image || '');
        addRecentlyViewed(data);
        
        // Auto-select size/color if they only have 1 option
        if (data.sizes && data.sizes.length === 1) {
          setSelectedSize(data.sizes[0]);
        }
        if (data.colors && data.colors.length === 1) {
          setSelectedColor(data.colors[0]);
        }
        
        setLoading(false);
      } catch {
        setError('Error fetching product or backend not running');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      document.getElementById('size-picker')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, id: product.id || product._id, qty: qty || 1, selectedSize, selectedColor } 
    });
    navigate('/cart');
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPincode(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }
    setPincodeError('');
    setCheckedPincode(pincode);
    try { localStorage.setItem('gul_pincode', pincode); } catch { /* not saved */ }
  };

  const requestStockAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotifyState('sending');
    try {
      const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${product._id}/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: notifyEmail }),
      });
      setNotifyState(res.ok ? 'done' : 'error');
    } catch {
      setNotifyState('error');
    }
  };

  const { title: displayTitle, subtitle: displaySubtitle } = splitProductName(product.name);
  const delivery = estimateDelivery(checkedPincode || undefined);

  const productRating = product.rating !== undefined ? product.rating : (product.averageRating || 0);
  const productReviewsCount = product.numReviews !== undefined ? product.numReviews : (product.reviewCount || 0);
  const inStock = !product.soldOut && product.countInStock > 0;
  const hasDiscount = product.originalPrice > product.price;
  const productUrl = `https://gulfashion.store/product/${product._id || id}`;
  const metaDescription = product.description ? product.description.replace(/\s+/g, ' ').substring(0, 155) : '';

  useSEO({
    title: product.name ? `${product.name} | Gul Fashion` : 'Gul Fashion',
    description: metaDescription,
    image: product.image,
    url: productUrl,
    type: 'product',
    structuredData: product._id ? {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: product.images?.length ? product.images : [product.image],
      description: product.description,
      sku: product._id,
      category: product.category,
      brand: { '@type': 'Brand', name: 'Gul Fashion' },
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'INR',
        price: String(product.price),
        itemCondition: 'https://schema.org/NewCondition',
        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'INR' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
        },
      },
    } : undefined,
  });

  return (
    <div className="product-page-detail">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop"><ArrowLeft size={14} aria-hidden="true" /> Shop</Link>
          {product.category && (
            <>
              <span aria-hidden="true">/</span>
              <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
            </>
          )}
        </nav>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
             <div className="loader-spinner" style={{ border: '3px solid #f3f3f3', borderTop: '3px solid #2D0A4E', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#FFF5F5', borderRadius: '24px', border: '1px solid #FED7D7' }}>
             <p style={{ color: '#C53030' }}>{error}</p>
          </div>
        ) : (
          <>
            <div className="product-detail-grid">
              {/* Image Section */}
              <div className="product-image-section">
                <div className="pdp-main-image">
                   <img src={getImageUrl(selectedImage || product.image, 1200)} alt={displayTitle} loading="eager" fetchPriority="high" />
                   <WishlistButton product={product} size={20} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 2 }} />
                   {!inStock && (
                     <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="pdp-soldout">Sold out</span>
                     </div>
                   )}
                </div>
                
                {/* Image Gallery Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    marginTop: '20px', 
                    overflowX: 'auto', 
                    paddingBottom: '10px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#2D0A4E #FDFBFD'
                  }}>
                    {product.images.map((imgUrl: string, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedImage(imgUrl)}
                        style={{
                          border: selectedImage === imgUrl ? '2px solid #2D0A4E' : '2px solid transparent',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          padding: 0,
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                          width: '70px',
                          height: '70px',
                          flexShrink: 0,
                          transition: 'all 0.2s ease',
                          opacity: selectedImage === imgUrl ? 1 : 0.7,
                          boxShadow: selectedImage === imgUrl ? '0 4px 10px rgba(45,10,78,0.15)' : 'none'
                        }}
                        onMouseOver={(e) => {
                          if (selectedImage !== imgUrl) {
                            e.currentTarget.style.opacity = '1';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (selectedImage !== imgUrl) {
                            e.currentTarget.style.opacity = '0.7';
                          }
                        }}
                      >
                        <img src={getImageUrl(imgUrl, 400)} alt={`${product.name} detail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Info Section */}
              <div className="product-info-section">
                <h1 className="pdp-title font-serif">{displayTitle}</h1>
                {displaySubtitle && <p className="pdp-subtitle">{displaySubtitle}</p>}
                
                {/* Rating summary below title */}
                {productReviewsCount > 0 ? (
                  <a href="#reviews" className="pdp-rating">
                    <StarRating rating={Math.round(productRating)} size={15} />
                    <span>{productReviewsCount} {productReviewsCount === 1 ? 'review' : 'reviews'}</span>
                  </a>
                ) : (
                  <a href="#reviews" className="pdp-rating pdp-rating-empty">Be the first to review</a>
                )}

                <p className="pdp-price">
                   ₹{product.price?.toLocaleString('en-IN')}
                   {hasDiscount && (
                     <>
                       <s>₹{product.originalPrice.toLocaleString('en-IN')}</s>
                       <span className="pdp-saving">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
                     </>
                   )}
                </p>
                <p className="pdp-tax-note">Inclusive of all taxes · Free shipping</p>

                <p className="pdp-description">{product.description}</p>

                {/* Purchase options */}
                <div className="pdp-purchase">
                   {inStock ? (
                     <>
                      {/* Sizes Selection */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div id="size-picker" style={{ marginBottom: '25px', scrollMarginTop: '120px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span className="pdp-label">Size{selectedSize ? <>: <strong>{selectedSize}</strong></> : ''}</span>
                            <button
                              type="button"
                              onClick={() => setShowSizeGuide(true)}
                              className="pdp-link-button"
                            >
                              Size guide
                            </button>
                          </div>
                          <div className="pdp-chips" role="radiogroup" aria-label="Size">
                            {product.sizes.map((size: string) => (
                              <button
                                key={size}
                                type="button"
                                role="radio"
                                aria-checked={selectedSize === size}
                                onClick={() => handleSizeSelect(size)}
                                className={`pdp-chip${selectedSize === size ? ' is-selected' : ''}`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          {sizeError && (
                            <p role="alert" className="pdp-error">Choose a size to add this to your bag.</p>
                          )}
                          {product.fitNote && (
                            <p className="pdp-fit-note">{product.fitNote}</p>
                          )}
                        </div>
                      )}

                      {/* Colors Selection */}
                      {product.colors && product.colors.length > 0 && (
                        <div style={{ marginBottom: '25px' }}>
                          <span className="pdp-label" style={{ display: 'block', marginBottom: '10px' }}>Colour{selectedColor ? <>: <strong>{selectedColor}</strong></> : ''}</span>
                          <div className="pdp-chips" role="radiogroup" aria-label="Colour">
                            {product.colors.map((color: string) => (
                              <button
                                key={color}
                                type="button"
                                role="radio"
                                aria-checked={selectedColor === color}
                                onClick={() => setSelectedColor(color)}
                                className={`pdp-chip pdp-chip-text${selectedColor === color ? ' is-selected' : ''}`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quantity Selector */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <span className="pdp-label">Quantity</span>
                        <div className="pdp-stepper">
                          <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                          <span aria-live="polite">{qty}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => setQty(Math.min(product.countInStock, qty + 1))}>+</button>
                        </div>
                      </div>
                      <button
                        ref={addToBagRef}
                        className="pdp-add-button"
                        onClick={addToCartHandler}
                      >
                        <ShoppingCart size={18} aria-hidden="true" /> Add to bag
                      </button>

                      {/* Delivery estimate */}
                      <form onSubmit={checkPincode} style={{ marginTop: '22px', paddingTop: '18px', borderTop: '1px solid #f3f3f3' }}>
                        <label htmlFor="pincode" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: '#2D0A4E', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '10px' }}>
                          <MapPin size={15} aria-hidden="true" /> Delivery
                        </label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            id="pincode"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="Enter pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                            style={{ flex: 1, minWidth: 0, padding: '12px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem' }}
                          />
                          <button type="submit" className="pdp-check-button">Check</button>
                        </div>
                        {pincodeError ? (
                          <p role="alert" style={{ color: '#C53030', fontSize: '0.8rem', margin: '8px 0 0' }}>{pincodeError}</p>
                        ) : (
                          <p style={{ color: '#555', fontSize: '0.85rem', margin: '8px 0 0' }}>
                            {checkedPincode ? <>Delivery to <strong>{checkedPincode}</strong> by </> : 'Usually delivered by '}
                            <strong style={{ color: '#15803D' }}>{delivery.label}</strong> · Free shipping
                          </p>
                        )}
                      </form>
                     </>
                   ) : (
                     <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <p style={{ color: 'var(--ink)', fontWeight: 500, margin: 0 }}>This design is sold out right now.</p>
                        {notifyState === 'done' ? (
                          <p role="status" style={{ color: '#15803D', fontWeight: 600, margin: '15px 0 0' }}>Done! We'll email you as soon as it's back.</p>
                        ) : (
                          <form onSubmit={requestStockAlert} style={{ marginTop: '15px' }}>
                            <label htmlFor="notify-email" style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '10px' }}>Get an email when it's back in stock</label>
                            <input
                              id="notify-email"
                              type="email"
                              required
                              placeholder="Your email address"
                              value={notifyEmail}
                              onChange={(e) => setNotifyEmail(e.target.value)}
                              style={{ width: '100%', padding: '14px 16px', border: '1px solid #ddd', borderRadius: '10px', fontSize: '0.95rem', marginBottom: '10px' }}
                            />
                            <button type="submit" disabled={notifyState === 'sending'} style={{ width: '100%', padding: '18px', backgroundColor: '#2D0A4E', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', letterSpacing: '1px', cursor: 'pointer' }}>
                              {notifyState === 'sending' ? 'SAVING...' : 'NOTIFY ME'}
                            </button>
                            {notifyState === 'error' && (
                              <p role="alert" style={{ color: '#C53030', fontSize: '0.85rem', margin: '8px 0 0' }}>Couldn't save that. Please check the email and try again.</p>
                            )}
                          </form>
                        )}
                     </div>
                   )}
                </div>

                {/* Service promises */}
                <ul className="pdp-promises">
                  <li><Truck size={18} strokeWidth={1.5} aria-hidden="true" /> Free shipping across India</li>
                  <li><RefreshCcw size={18} strokeWidth={1.5} aria-hidden="true" /> 7-day size exchange</li>
                  <li><ShieldCheck size={18} strokeWidth={1.5} aria-hidden="true" /> Secure payment</li>
                </ul>
              </div>
            </div>

            {/* Detailed Information Sections (Stacked) */}
            <div className="product-details-stacked" style={{ marginTop: '80px', borderTop: '1px solid #eee', paddingTop: '60px' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
                
                {/* 1. Specifications Section */}
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '40px' }}>
                  
                  <h3 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '25px', marginTop: 0 }}>Specifications</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                        <td style={{ padding: '15px 0', color: '#999', width: '35%', fontWeight: '600' }}>Category</td>
                        <td style={{ padding: '15px 0', color: '#2D0A4E', fontWeight: '700' }}>{product.category}</td>
                      </tr>
                      {product.subcategory && (
                        <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                          <td style={{ padding: '15px 0', color: '#999', fontWeight: '600' }}>Subcategory</td>
                          <td style={{ padding: '15px 0', color: '#2D0A4E', fontWeight: '700' }}>{product.subcategory}</td>
                        </tr>
                      )}
                      {product.materials && product.materials.length > 0 && (
                        <tr style={{ borderBottom: '1px solid #f8f8f8' }}>
                          <td style={{ padding: '15px 0', color: '#999', fontWeight: '600' }}>Material / Fabric</td>
                          <td style={{ padding: '15px 0', color: '#2D0A4E', fontWeight: '700' }}>{product.materials.join(', ')}</td>
                        </tr>
                      )}
                      {product.specifications && product.specifications.length > 0 && product.specifications.map((spec: string, index: number) => {
                        const parts = spec.split(':');
                        const label = parts.length > 1 ? parts[0] : `Feature ${index + 1}`;
                        const value = parts.length > 1 ? parts.slice(1).join(':') : spec;
                        return (
                          <tr key={index} style={{ borderBottom: '1px solid #f8f8f8' }}>
                            <td style={{ padding: '15px 0', color: '#999', fontWeight: '600' }}>{label.trim()}</td>
                            <td style={{ padding: '15px 0', color: '#2D0A4E', fontWeight: '700' }}>{value.trim()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 2. Care Instructions Section */}
                <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '40px' }}>
                  <h3 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '25px', marginTop: 0 }}>Care guide</h3>
                  {product.careInstructions && product.careInstructions.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                      {product.careInstructions.map((inst: string, idx: number) => (
                        <li key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '15px', 
                          padding: '12px 15px', 
                          borderBottom: '1px solid #fcfcfc',
                          fontSize: '1rem',
                          color: '#555'
                        }}>
                          <span style={{ color: 'var(--brass)', fontSize: '1.2rem', lineHeight: '1' }}>✦</span>
                          <span>{inst}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>We recommend professional dry clean or gentle hand wash with mild detergent for all ethnic wear to preserve colors and embroidery.</p>
                  )}
                </div>

                {/* 3. Reviews Section */}
                <div id="reviews" style={{ scrollMarginTop: '120px' }}>
                  
                  <ReviewsTab productId={product._id} />
                </div>

              </div>
            </div>

            {inStock && (
              <div className={`pdp-sticky-bar${showStickyBar ? ' is-visible' : ''}`} aria-hidden={!showStickyBar}>
                <div>
                  <p className="pdp-sticky-name">{displayTitle}</p>
                  <p className="pdp-sticky-price">₹{product.price?.toLocaleString('en-IN')}{selectedSize ? ` · Size ${selectedSize}` : ''}</p>
                </div>
                <button type="button" tabIndex={showStickyBar ? 0 : -1} onClick={addToCartHandler}>Add to bag</button>
              </div>
            )}

            {/* Recently viewed */}
            {recentlyViewed.length > 0 && (
              <section style={{ marginTop: '80px' }}>
                <h2 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '24px' }}>Recently Viewed</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '18px' }}>
                  {recentlyViewed.map((item) => (
                    <Link key={item._id} to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#2D0A4E' }}>
                      <img src={getImageUrl(item.image, 400)} alt={item.name} loading="lazy" style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', borderRadius: '14px', display: 'block' }} />
                      <p style={{ fontSize: '0.85rem', margin: '8px 0 2px', lineHeight: 1.4 }}>{splitProductName(item.name).title}</p>
                      <p style={{ fontWeight: 700, margin: 0 }}>₹{Number(item.price).toLocaleString('en-IN')}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button 
              onClick={() => setShowSizeGuide(false)}
              style={{ 
                position: 'absolute', 
                top: '20px', 
                right: '20px', 
                border: 'none', 
                background: 'none', 
                fontSize: '2rem', 
                cursor: 'pointer', 
                color: '#999',
                lineHeight: '1',
                padding: '5px'
              }}
            >
              &times;
            </button>
            <span style={{ 
              color: 'var(--brass)', 
              letterSpacing: '4px', 
              fontWeight: '800', 
              fontSize: '0.7rem', 
              textTransform: 'uppercase', 
              display: 'block', 
              marginBottom: '10px' 
            }}>FIT GUIDE</span>
            <h3 className="font-serif" style={{ fontSize: '2rem', color: '#2D0A4E', marginBottom: '25px', marginTop: 0 }}>Size Chart (Inches)</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #2D0A4E', color: '#2D0A4E', fontWeight: '800' }}>
                  <th style={{ padding: '12px' }}>Size</th>
                  <th style={{ padding: '12px' }}>Chest</th>
                  <th style={{ padding: '12px' }}>Waist</th>
                  <th style={{ padding: '12px' }}>Hip</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: 'S', chest: '36', waist: '32', hip: '38' },
                  { size: 'M', chest: '38', waist: '34', hip: '40' },
                  { size: 'L', chest: '40', waist: '36', hip: '42' },
                  { size: 'XL', chest: '42', waist: '38', hip: '44' },
                  { size: 'XXL', chest: '44', waist: '40', hip: '46' },
                  { size: '4XL', chest: '48', waist: '44', hip: '50' },
                  { size: '5XL', chest: '50', waist: '46', hip: '52' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: '700', color: '#2D0A4E' }}>{row.size}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{row.chest}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{row.waist}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <p style={{ marginTop: '25px', fontSize: '0.8rem', color: '#666', lineHeight: '1.5', textAlign: 'center' }}>
              * These are garment measurements. We recommend choosing a size that is 2 inches larger than your body bust measurement for a comfortable fit.
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Remount on every product id so loading state, selected size, qty and image reset between products
const ProductRoute = () => {
  const { id } = useParams();
  return <ProductScreen key={id} />;
};

export default ProductRoute;
