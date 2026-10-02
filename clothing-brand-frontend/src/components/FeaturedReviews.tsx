import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, BadgeCheck } from 'lucide-react';
import { API_BASE_URL } from '../utils/api';
import { getImageUrl } from '../utils/mediaHelper';

interface FeaturedReview {
  _id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified?: boolean;
  productId?: { _id: string; name: string } | null;
}

// Real, approved customer reviews. Renders nothing until the store has some.
const FeaturedReviews = ({ heading = 'Loved by Our Customers' }: { heading?: string }) => {
  const [reviews, setReviews] = useState<FeaturedReview[]>([]);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/reviews/featured`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active && Array.isArray(data)) setReviews(data);
      })
      .catch(() => { /* testimonials are optional */ });
    return () => { active = false; };
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="container" style={{ paddingTop: 'clamp(48px, 6vw, 88px)' }}>
      <div style={{ marginBottom: '24px' }}>
                <h2 className="section-heading">{heading}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {reviews.map((review) => (
          <article key={review._id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '2px', padding: '22px' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }} aria-label={`${review.rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={14} fill={n <= review.rating ? 'var(--brass)' : 'none'} color={n <= review.rating ? 'var(--brass)' : '#ddd'} />
              ))}
            </div>
            <h3 style={{ fontSize: '1rem', color: '#2D0A4E', margin: '0 0 6px' }}>{review.title}</h3>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 12px' }}>{review.comment}</p>
            {review.images && review.images.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {review.images.slice(0, 3).map((img) => (
                  <img key={img} src={getImageUrl(img, 200)} alt="Customer photo" style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} loading="lazy" />
                ))}
              </div>
            )}
            <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <strong style={{ color: '#2D0A4E' }}>{review.userName}</strong>
              {review.verified && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#15803D' }}>
                  <BadgeCheck size={14} /> Verified buyer
                </span>
              )}
              {review.productId && (
                <Link to={`/product/${review.productId._id}`} style={{ color: '#888' }}>· {review.productId.name}</Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedReviews;
