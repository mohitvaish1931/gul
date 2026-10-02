import { useEffect, useState } from 'react';
import { Check, X, Star } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

interface PendingReview {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  productId?: { _id: string; name: string; image?: string } | null;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/reviews/admin/pending`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || 'Failed to load reviews');
        if (active) setReviews(data.reviews || []);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load reviews');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const moderate = async (id: string, action: 'approve' | 'reject') => {
    setBusyId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews/admin/${id}/${action}`, { method: 'PUT' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || data.error || `Failed to ${action} review`);
      }
      setReviews((current) => current.filter((r) => r._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : `Failed to ${action} review`);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Pending Reviews</h1>
        <span className="text-sm text-gray-500">{reviews.length} waiting for approval</span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading reviews...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : reviews.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500">No reviews are waiting for approval.</div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {reviews.map((review) => (
            <li key={review._id} className="px-6 py-5 flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">
                  {review.productId?.name || 'Deleted product'} · {new Date(review.createdAt).toLocaleDateString('en-IN')}
                </p>
                <div className="flex items-center gap-1 mb-1" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-4 h-4" fill={n <= review.rating ? '#D4AF37' : 'none'} color={n <= review.rating ? '#D4AF37' : '#D1D5DB'} />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900">{review.title}</p>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-2">by {review.userName} ({review.userEmail})</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => moderate(review._id, 'approve')}
                  disabled={busyId === review._id}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => moderate(review._id, 'reject')}
                  disabled={busyId === review._id}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReviews;
