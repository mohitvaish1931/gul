import { Link, useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getImageUrl } from '../../utils/mediaHelper';
import { splitProductName } from '../../utils/productName';
import {
  type AdminSummary, customerName, hasOpenExchange, needsShipping, orderDate,
  isOutOfStock, orderNumber, orderState, rupees, sameDay,
} from './adminData';

const DAY_MS = 24 * 60 * 60 * 1000;

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

const greetingFor = (date: Date) => {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const AdminDashboard = () => {
  const { orders, unreadMessages, pendingReviews, loading, error, refresh } = useOutletContext<AdminSummary>();
  const { state } = useAppContext();

  const now = new Date();
  const paid = orders.filter((o) => o.isPaid && o.status !== 'Cancelled');

  // Today and this month
  const today = paid.filter((o) => sameDay(orderDate(o), now));
  const todayTotal = today.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const thisMonth = paid.filter((o) => {
    const d = orderDate(o);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });
  const monthTotal = thisMonth.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  // What needs the owner's attention
  const toShip = orders.filter(needsShipping).length;
  const exchanges = orders.filter(hasOpenExchange).length;
  const unfinished = orders.filter((o) =>
    !o.isPaid && o.status !== 'Cancelled' && now.getTime() - new Date(o.createdAt || 0).getTime() < 7 * DAY_MS).length;
  const outOfStock = state.products.filter(isOutOfStock).length;

  const tasks = [
    { count: toShip, label: plural(toShip, 'paid order to ship', 'paid orders to ship'), hint: 'Pack and hand over to the courier', to: '/admin/orders?show=to-ship', urgent: true },
    { count: exchanges, label: plural(exchanges, 'exchange request', 'exchange requests'), hint: 'Approve or reject the size change', to: '/admin/orders?show=exchanges', urgent: true },
    { count: unreadMessages, label: plural(unreadMessages, 'unread message', 'unread messages'), hint: 'From the contact form', to: '/admin/messages' },
    { count: pendingReviews, label: plural(pendingReviews, 'review waiting for approval', 'reviews waiting for approval'), hint: 'Shown on the store once approved', to: '/admin/reviews' },
    { count: unfinished, label: plural(unfinished, 'unfinished checkout', 'unfinished checkouts'), hint: 'Started paying in the last 7 days but did not finish', to: '/admin/orders?show=unpaid' },
    { count: outOfStock, label: plural(outOfStock, 'product out of stock', 'products out of stock'), hint: 'Restock them or mark them sold out', to: '/admin/inventory?show=out' },
  ].filter((task) => task.count > 0);

  // Last 14 days of sales, oldest first
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13 + i);
    const dayOrders = paid.filter((o) => sameDay(orderDate(o), date));
    return { date, total: dayOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0), count: dayOrders.length };
  });
  const maxDay = Math.max(...days.map((d) => d.total), 1);
  const fortnightTotal = days.reduce((sum, d) => sum + d.total, 0);
  const fortnightOrders = days.reduce((sum, d) => sum + d.count, 0);

  // Best sellers over the last 30 days, or all time while the month is quiet
  const rankSales = (list: typeof paid) => {
    const sales: Record<string, { name: string; image?: string; qty: number; price: number }> = {};
    list.forEach((o) => (o.orderItems || []).forEach((item) => {
      const key = item.product || item.name;
      sales[key] = sales[key] || { name: item.name, image: item.image, qty: 0, price: item.price || 0 };
      sales[key].qty += item.qty || 1;
    }));
    return Object.values(sales).sort((a, b) => b.qty - a.qty).slice(0, 5);
  };
  const recentBest = rankSales(paid.filter((o) => now.getTime() - orderDate(o).getTime() < 30 * DAY_MS));
  const bestIsRecent = recentBest.length > 0;
  const bestSellers = bestIsRecent ? recentBest : rankSales(paid);

  const latest = paid.slice(0, 6);

  // The daybook line at the top of the page
  const dayLine = loading
    ? 'Reading today’s orders…'
    : `${today.length === 0 ? 'No orders yet today.' : `${plural(today.length, 'order', 'orders')} today, worth ${rupees(todayTotal)}.`} ${
      toShip > 0 ? `${plural(toShip, 'paid order is', 'paid orders are')} waiting to be shipped.` : 'Every paid order is on its way.'}`;

  const dateLabel = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const monthName = now.toLocaleDateString('en-IN', { month: 'long' });

  return (
    <div className="ov">
      <section className="ov-day" aria-labelledby="ov-greeting">
        <div>
          <p className="ov-date">{dateLabel}</p>
          <h1 id="ov-greeting" className="ov-greeting">{greetingFor(now)}</h1>
          <p className={`ov-line${loading ? ' ov-line-muted' : ''}`} aria-live="polite">{dayLine}</p>
          <div className="ov-day-actions">
            <Link to="/admin/products/add" className="adm-btn">
              <Plus aria-hidden="true" />
              Add product
            </Link>
            <Link to="/admin/orders" className="adm-btn adm-btn-quiet">See all orders</Link>
          </div>
        </div>

        <div className="ov-arch">
          <span className="ov-arch-label">{monthName} so far</span>
          <span className="ov-arch-amount">{loading ? '—' : rupees(monthTotal)}</span>
          <span className="ov-arch-sub">{loading ? <>&nbsp;</> : thisMonth.length ? `from ${plural(thisMonth.length, 'paid order', 'paid orders')}` : 'No paid orders yet'}</span>
        </div>
      </section>

      {error && (
        <div className="adm-error" role="alert">
          <span>Orders could not be loaded. Check the internet connection, then try again.</span>
          <button type="button" className="adm-btn adm-btn-quiet" onClick={refresh}>Try again</button>
        </div>
      )}

      <div className="ov-grid">
        <section className="adm-panel" aria-labelledby="ov-tasks-title">
          <div className="adm-panel-head">
            <h2 id="ov-tasks-title" className="adm-panel-title">Needs you</h2>
          </div>
          {loading ? (
            <p className="ov-calm">Checking orders, messages and reviews…</p>
          ) : tasks.length === 0 ? (
            <p className="ov-calm">Nothing is waiting. Orders are shipped, messages read and reviews approved.</p>
          ) : (
            <ul className="ov-tasks">
              {tasks.map((task) => (
                <li key={task.label}>
                  <Link to={task.to} className={`ov-task${task.urgent ? ' ov-task-urgent' : ''}`}>
                    <span className="ov-task-count" aria-hidden="true">{task.count}</span>
                    <span className="ov-task-label">
                      {task.label}
                      <span className="ov-task-hint">{task.hint}</span>
                    </span>
                    <span className="ov-task-go">Open</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="adm-panel" aria-labelledby="ov-sales-title">
          <div className="adm-panel-head">
            <h2 id="ov-sales-title" className="adm-panel-title">Sales, last 14 days</h2>
            <Link to="/admin/reports/sales" className="adm-link">Sales report</Link>
          </div>
          <div className="ov-chart">
            <div className={`ov-bars${fortnightTotal === 0 ? ' ov-bars-empty' : ''}`} role="list" aria-label="Paid sales per day">
              {days.map((day) => {
                const isToday = sameDay(day.date, now);
                const label = `${day.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}: ${rupees(day.total)}, ${plural(day.count, 'order', 'orders')}`;
                return (
                  <div
                    key={day.date.toISOString()}
                    role="listitem"
                    aria-label={label}
                    title={label}
                    className={`ov-bar${isToday ? ' ov-bar-today' : ''}${day.total > 0 ? ' ov-bar-has' : ''}`}
                  >
                    <div className="ov-bar-fill" style={{ height: `${(day.total / maxDay) * 100}%` }} />
                  </div>
                );
              })}
            </div>
            <div className="ov-days" aria-hidden="true">
              {days.map((day) => (
                <span key={day.date.toISOString()} className={sameDay(day.date, now) ? 'is-today' : undefined}>
                  {day.date.getDate()}
                </span>
              ))}
            </div>
            <p className="ov-chart-note">
              {fortnightOrders === 0 ? (
                'No paid orders in the last 14 days.'
              ) : fortnightTotal === 0 ? (
                `${plural(fortnightOrders, 'order', 'orders')} in the last 14 days, all free with a 100% coupon.`
              ) : (
                <>
                  <strong>{rupees(fortnightTotal)}</strong> from {plural(fortnightOrders, 'order', 'orders')}, an average of{' '}
                  <strong>{rupees(fortnightTotal / fortnightOrders)}</strong> per order. Today is the brass bar.
                </>
              )}
            </p>
          </div>
        </section>
      </div>

      <div className="ov-grid ov-grid-wide">
        <section className="adm-panel" aria-labelledby="ov-latest-title">
          <div className="adm-panel-head">
            <h2 id="ov-latest-title" className="adm-panel-title">Latest orders</h2>
            <Link to="/admin/orders" className="adm-link">All orders</Link>
          </div>
          {latest.length === 0 ? (
            <p className="adm-empty">{loading ? 'Loading orders…' : 'Paid orders will appear here.'}</p>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th scope="col">Order</th>
                    <th scope="col" className="adm-hide-sm">Items</th>
                    <th scope="col" className="num">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latest.map((order) => {
                    const items = order.orderItems || [];
                    const first = items[0];
                    const state = orderState(order);
                    return (
                      <tr key={order._id}>
                        <td>
                          <span className="adm-strong">{customerName(order)}</span>
                          <span className="adm-sub">
                            {orderNumber(order)}, {orderDate(order).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </td>
                        <td className="adm-hide-sm">
                          {first && (
                            <div className="adm-item">
                              {first.image && <img className="adm-thumb" src={getImageUrl(first.image, 120)} alt="" loading="lazy" />}
                              <span style={{ minWidth: 0 }}>
                                <span className="adm-item-name">{splitProductName(first.name).title}</span>
                                <span className="adm-sub">
                                  {[first.selectedSize && `Size ${first.selectedSize}`, items.length > 1 && `${items.length - 1} more`].filter(Boolean).join(', ') || `Qty ${first.qty}`}
                                </span>
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="num">
                          {order.totalPrice ? rupees(order.totalPrice) : <span className="adm-quiet" title="Paid with a 100% coupon">Free</span>}
                        </td>
                        <td>
                          <span className={`adm-state adm-state-${state.toLowerCase().replace(' ', '-')}`}>{state}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="adm-panel" aria-labelledby="ov-best-title">
          <div className="adm-panel-head">
            <h2 id="ov-best-title" className="adm-panel-title">{bestIsRecent ? 'Best sellers, 30 days' : 'Best sellers, all time'}</h2>
            <Link to="/admin/products" className="adm-link">Products</Link>
          </div>
          {bestSellers.length === 0 ? (
            <p className="adm-empty">{loading ? 'Loading…' : 'Products will be ranked here once orders come in.'}</p>
          ) : (
            <ul className="ov-best">
              {bestSellers.map((item) => (
                <li key={item.name}>
                  {item.image ? <img className="adm-thumb" src={getImageUrl(item.image, 120)} alt="" loading="lazy" /> : <span className="adm-thumb" />}
                  <span className="ov-best-text">
                    <span className="ov-best-name">{splitProductName(item.name).title}</span>
                  </span>
                  <span className="ov-best-sold">
                    <strong>{item.qty} sold</strong>
                    {rupees(item.price)} each
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
