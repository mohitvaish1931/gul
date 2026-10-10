import { useCallback, useEffect, useRef, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../utils/api';

// What the admin shell and the overview need to know about the shop.
// Loaded once by AdminLayout and handed to pages through the router outlet.

export interface AdminOrderItem {
  name: string;
  qty: number;
  image?: string;
  price: number;
  product?: string;
  selectedSize?: string;
}

export interface AdminOrder {
  _id: string;
  orderItems?: AdminOrderItem[];
  shippingAddress?: { name?: string; email?: string; city?: string; phoneNumber?: string };
  couponCode?: string;
  user?: { name?: string } | string;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: string;
  status?: string;
  exchangeRequest?: { status?: string };
  createdAt?: string;
}

export interface AdminSummary {
  orders: AdminOrder[];
  unreadMessages: number;
  pendingReviews: number;
  loading: boolean;
  error: boolean;
  refresh: () => void;
}

const CLOSED_STATUSES = ['Shipped', 'Delivered', 'Cancelled'];

export const needsShipping = (order: AdminOrder) =>
  Boolean(order.isPaid) && !CLOSED_STATUSES.includes(order.status || '');

export const hasOpenExchange = (order: AdminOrder) => order.exchangeRequest?.status === 'requested';

// When the money actually came in (falls back to when the order was placed)
export const orderDate = (order: AdminOrder) => new Date(order.paidAt || order.createdAt || 0);

export const orderNumber = (order: AdminOrder) => `GUL-${order._id.slice(0, 6).toUpperCase()}`;

export const customerName = (order: AdminOrder) =>
  order.shippingAddress?.name || (typeof order.user === 'object' ? order.user?.name : '') || 'Customer';

export type OrderState = 'Unpaid' | 'To ship' | 'Shipped' | 'Delivered' | 'Cancelled';

export const orderState = (order: AdminOrder): OrderState => {
  if (order.status === 'Cancelled') return 'Cancelled';
  if (order.status === 'Delivered') return 'Delivered';
  if (order.status === 'Shipped') return 'Shipped';
  return order.isPaid ? 'To ship' : 'Unpaid';
};

export const rupees = (amount: number) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

// Stock lives in countInStock on the product; soldOut is the manual switch in the editor
export const LOW_STOCK = 5;
export const stockOf = (product: { countInStock?: number; stock?: number }) =>
  product.countInStock ?? product.stock ?? 0;
export const isOutOfStock = (product: { soldOut?: boolean; countInStock?: number; stock?: number }) =>
  Boolean(product.soldOut) || stockOf(product) <= 0;

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const REFRESH_AFTER_MS = 10 * 1000;

export function useAdminSummary(enabled: boolean, routeKey: string): AdminSummary {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const lastLoaded = useRef(0);

  const load = useCallback(async () => {
    lastLoaded.current = Date.now();
    try {
      const [ordersRes, messagesRes, reviewsRes] = await Promise.all([
        fetch(API_ENDPOINTS.ORDERS.BASE),
        fetch(`${API_BASE_URL}/api/contact`),
        fetch(`${API_BASE_URL}/api/reviews/admin/pending`),
      ]);
      if (!ordersRes.ok) throw new Error('orders');
      setOrders(await ordersRes.json());
      if (messagesRes.ok) {
        const messages: { status?: string }[] = await messagesRes.json();
        setUnreadMessages(messages.filter((m) => m.status === 'new').length);
      }
      if (reviewsRes.ok) {
        const reviews: { count?: number } = await reviewsRes.json();
        setPendingReviews(reviews.count || 0);
      }
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload when the admin moves between pages, so counts follow what they just changed
  useEffect(() => {
    if (enabled && Date.now() - lastLoaded.current > REFRESH_AFTER_MS) load();
  }, [enabled, routeKey, load]);

  const refresh = useCallback(() => { load(); }, [load]);

  return { orders, unreadMessages, pendingReviews, loading, error, refresh };
}
