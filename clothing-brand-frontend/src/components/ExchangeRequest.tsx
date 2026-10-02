import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import { API_ENDPOINTS } from '../utils/api';

interface ExchangeOrder {
  _id: string;
  status?: string;
  deliveredAt?: string;
  updatedAt?: string;
  exchangeRequest?: { status?: string; reason?: string; preferredSize?: string };
}

const EXCHANGE_WINDOW_DAYS = 7;
const REASONS = ['Size too small', 'Size too large', 'Fit is not right', 'Received wrong size'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

const STATUS_LABEL: Record<string, string> = {
  requested: "Exchange requested – we'll contact you within 24 hours",
  approved: 'Exchange approved – pickup will be arranged',
  rejected: 'Exchange request declined – please WhatsApp us for help',
  completed: 'Exchange completed',
};

// Size exchange request for a delivered order (7-day exchange policy)
const ExchangeRequest = ({ order, onUpdated }: { order: ExchangeOrder; onUpdated: (order: ExchangeOrder) => void }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [preferredSize, setPreferredSize] = useState('');
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [now] = useState(() => Date.now()); // read once so renders stay pure

  const requestStatus = order.exchangeRequest?.status;
  if (requestStatus) {
    return (
      <p style={{ marginTop: '16px', padding: '12px 14px', background: '#FDF8EC', border: '1px solid #F3E3B5', borderRadius: '8px', fontSize: '0.85rem', color: '#7A5B0B' }}>
        {STATUS_LABEL[requestStatus] || `Exchange ${requestStatus}`}
      </p>
    );
  }

  if (order.status !== 'Delivered') return null;
  const deliveredAt = new Date(order.deliveredAt || order.updatedAt || 0).getTime();
  const daysLeft = Math.ceil(EXCHANGE_WINDOW_DAYS - (now - deliveredAt) / (24 * 60 * 60 * 1000));
  if (daysLeft <= 0) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API_ENDPOINTS.ORDERS.BASE}/${order._id}/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, preferredSize, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Could not send your request');
      onUpdated(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your request');
    } finally {
      setSending(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1.5px solid #2D0A4E', background: '#fff', color: '#2D0A4E', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px', cursor: 'pointer' }}
      >
        <RefreshCcw size={15} /> REQUEST SIZE EXCHANGE ({daysLeft} {daysLeft === 1 ? 'day' : 'days'} left)
      </button>
    );
  }

  const fieldStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', background: '#fff' };

  return (
    <form onSubmit={submit} style={{ marginTop: '16px', padding: '18px', background: '#FDFBFD', border: '1px solid #efe4ff', borderRadius: '12px', display: 'grid', gap: '12px' }}>
      <strong style={{ color: '#2D0A4E', fontSize: '0.95rem' }}>Request a size exchange</strong>
      <label style={{ fontSize: '0.8rem', color: '#555' }}>
        Reason
        <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ ...fieldStyle, marginTop: '4px' }}>
          {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label style={{ fontSize: '0.8rem', color: '#555' }}>
        Size you'd like instead
        <select value={preferredSize} onChange={(e) => setPreferredSize(e.target.value)} style={{ ...fieldStyle, marginTop: '4px' }}>
          <option value="">Not sure – please help me choose</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label style={{ fontSize: '0.8rem', color: '#555' }}>
        Anything else? (optional)
        <textarea rows={2} value={details} onChange={(e) => setDetails(e.target.value)} style={{ ...fieldStyle, marginTop: '4px', resize: 'vertical' }} />
      </label>
      <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Garments must be unworn with original tags attached.</p>
      {error && <p role="alert" style={{ color: '#C53030', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => setOpen(false)} style={{ padding: '10px 16px', border: '1px solid #ddd', background: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={sending} style={{ padding: '10px 16px', border: 'none', background: '#2D0A4E', color: '#fff', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          {sending ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
};

export default ExchangeRequest;
