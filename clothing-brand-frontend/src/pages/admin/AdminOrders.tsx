import { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { API_ENDPOINTS } from '../../utils/api';
import { getImageUrl } from '../../utils/mediaHelper';
import { splitProductName } from '../../utils/productName';
import {
  type AdminOrder, type AdminSummary, customerName, hasOpenExchange, needsShipping,
  orderDate, orderNumber, orderState, rupees,
} from './adminData';

interface FullOrder extends AdminOrder {
  shippingAddress?: AdminOrder['shippingAddress'] & {
    address?: string; postalCode?: string; phoneNumber?: string; phone?: string;
  };
  couponCode?: string;
  trackingUrl?: string;
  awbNumber?: string;
  courierName?: string;
  exchangeRequest?: { status?: string; reason?: string; preferredSize?: string; details?: string };
}

const FILTERS: { value: string; label: string; test: (o: FullOrder) => boolean }[] = [
  { value: 'to-ship', label: 'To ship', test: needsShipping },
  { value: 'exchanges', label: 'Exchange requests', test: hasOpenExchange },
  { value: 'shipped', label: 'Shipped', test: (o) => o.status === 'Shipped' },
  { value: 'delivered', label: 'Delivered', test: (o) => o.status === 'Delivered' },
  { value: 'unpaid', label: 'Unfinished checkouts', test: (o) => !o.isPaid && o.status !== 'Cancelled' },
  { value: 'cancelled', label: 'Cancelled', test: (o) => o.status === 'Cancelled' },
  { value: 'all', label: 'All', test: () => true },
];

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const { dispatch } = useAppContext();
  const { refresh } = useOutletContext<AdminSummary>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<Record<string, 'saved' | 'failed'>>({});

  const show = searchParams.get('show') || 'all';
  const setShow = (value: string) => setSearchParams(value === 'all' ? {} : { show: value }, { replace: true });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.ORDERS.BASE);
        if (!res.ok) throw new Error('Failed to load orders');
        setOrders(await res.json());
        setLoadFailed(false);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setLoadFailed(true);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const markSaved = (id: string, result: 'saved' | 'failed') => {
    setSaved((s) => ({ ...s, [id]: result }));
    if (result === 'saved') setTimeout(() => setSaved((s) => { const next = { ...s }; delete next[id]; return next; }), 2500);
  };

  const updateStatus = async (order: FullOrder, status: string) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.ORDERS.BASE}/${order._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Status update failed');
      const updated = await res.json();
      setOrders((list) => list.map((o) => (o._id === order._id ? updated : o)));
      dispatch({ type: 'UPDATE_ORDER', payload: updated });
      markSaved(order._id, 'saved');
      refresh();
    } catch (err) {
      console.error('Failed to update order status:', err);
      markSaved(order._id, 'failed');
    }
  };

  const updateExchange = async (order: FullOrder, status: string) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.ORDERS.BASE}/${order._id}/exchange`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Exchange update failed');
      const updated = await res.json();
      setOrders((list) => list.map((o) => (o._id === order._id ? { ...o, exchangeRequest: updated.exchangeRequest } : o)));
      markSaved(order._id, 'saved');
      refresh();
    } catch (err) {
      console.error('Failed to update exchange:', err);
      markSaved(order._id, 'failed');
    }
  };

  const filter = FILTERS.find((f) => f.value === show) || FILTERS[FILTERS.length - 1];
  const needle = query.trim().toLowerCase();
  const visible = orders.filter((o) => {
    if (!filter.test(o)) return false;
    if (!needle) return true;
    const a = o.shippingAddress || {};
    return [customerName(o), orderNumber(o), a.email, a.phoneNumber, a.phone, a.city, a.postalCode]
      .some((v) => (v || '').toLowerCase().includes(needle));
  });

  const toShip = orders.filter(needsShipping).length;
  const exchanges = orders.filter(hasOpenExchange).length;

  return (
    <div className="adm-page">
      <div className="adm-head">
        <div>
          <h1>Orders</h1>
          <p className="adm-head-note">
            {loading
              ? 'Loading orders…'
              : toShip || exchanges
                ? [toShip && `${toShip} paid ${toShip === 1 ? 'order' : 'orders'} to ship`, exchanges && `${exchanges} exchange ${exchanges === 1 ? 'request' : 'requests'} to answer`].filter(Boolean).join(' and ') + '.'
                : 'Every paid order has been shipped.'}
          </p>
        </div>
      </div>

      <div className="adm-toolbar">
        <label className="adm-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Name, phone, city or order number"
            aria-label="Search orders"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="adm-chips" role="group" aria-label="Filter orders">
          {FILTERS.map((f) => {
            const count = orders.filter(f.test).length;
            if (count === 0 && f.value !== 'all' && f.value !== show) return null;
            return (
              <button key={f.value} type="button" className="adm-chip" aria-pressed={show === f.value} onClick={() => setShow(f.value)}>
                {f.label} <span className="adm-chip-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {loadFailed && (
        <div className="adm-error" role="alert">Orders could not be loaded. Check the internet connection and refresh the page.</div>
      )}

      <section className="adm-panel" aria-label={`${filter.label} orders`}>
        {visible.length === 0 ? (
          <p className="adm-empty" style={{ paddingTop: 22 }}>
            {loading ? 'Loading orders…' : needle ? 'No orders match this search.' : `No orders here right now.`}
          </p>
        ) : (
          <ul className="adm-orders">
            {visible.map((order) => {
              const a = order.shippingAddress || {};
              const items = order.orderItems || [];
              const state = orderState(order);
              const phone = a.phoneNumber || a.phone;
              return (
                <li key={order._id} className="adm-order">
                  <div>
                    <div className="adm-order-name">{customerName(order)}</div>
                    <div className="adm-order-meta">
                      {orderNumber(order)}, {orderDate(order).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <br />
                      {phone && <><a href={`tel:${phone}`}>{phone}</a><br /></>}
                      {a.email && <>{a.email}<br /></>}
                      {[a.address, a.city, a.postalCode].filter(Boolean).join(', ')}
                    </div>
                  </div>

                  <div className="adm-order-items">
                    {items.map((item, idx) => (
                      <div key={idx} className="adm-item">
                        {item.image && <img className="adm-thumb" src={getImageUrl(item.image, 120)} alt="" loading="lazy" />}
                        <span style={{ minWidth: 0 }}>
                          <span className="adm-item-name">{splitProductName(item.name).title}</span>
                          <span className="adm-sub">
                            {[item.selectedSize && `Size ${item.selectedSize}`, `Qty ${item.qty}`, rupees(item.price)].filter(Boolean).join(', ')}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="adm-order-side">
                    <div className="adm-order-total">
                      {order.totalPrice ? rupees(order.totalPrice) : 'Free'}
                      {order.isPaid && <small>{order.couponCode ? `Paid, coupon ${order.couponCode}` : 'Paid'}</small>}
                    </div>

                    <div className="adm-order-status">
                      <span className={`adm-state adm-state-${state.toLowerCase().replace(' ', '-')}`}>{state}</span>
                      <select
                        className="adm-select"
                        aria-label={`Status of order ${orderNumber(order)}`}
                        value={order.status || 'Pending'}
                        onChange={(e) => updateStatus(order, e.target.value)}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {order.trackingUrl && (
                        <a className="adm-link" href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                          Track{order.courierName ? ` with ${order.courierName}` : ' shipment'}
                        </a>
                      )}
                      {saved[order._id] === 'saved' && <span className="adm-status-saved" role="status">Saved</span>}
                      {saved[order._id] === 'failed' && <span className="adm-status-failed" role="alert">Not saved. Try again.</span>}
                    </div>
                  </div>

                  {order.exchangeRequest?.status && (
                    <div className="adm-exchange">
                      <span>
                        <strong>Exchange request:</strong> {order.exchangeRequest.reason}
                        {order.exchangeRequest.preferredSize ? `, wants size ${order.exchangeRequest.preferredSize}` : ''}
                        {order.exchangeRequest.details ? `. ${order.exchangeRequest.details}` : ''}
                      </span>
                      <select
                        className="adm-select"
                        aria-label={`Exchange status for order ${orderNumber(order)}`}
                        value={order.exchangeRequest.status}
                        onChange={(e) => updateExchange(order, e.target.value)}
                      >
                        <option value="requested">Requested</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminOrders;
