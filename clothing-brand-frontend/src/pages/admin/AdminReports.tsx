import { NavLink, useOutletContext } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { getImageUrl } from '../../utils/mediaHelper';
import { splitProductName } from '../../utils/productName';
import { type AdminOrder, type AdminSummary, customerName, orderDate, rupees } from './adminData';

export type ReportView = 'sales' | 'products' | 'customers';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
const shortDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const TABS: { view: ReportView; label: string; path: string }[] = [
  { view: 'sales', label: 'Sales', path: '/admin/reports/sales' },
  { view: 'products', label: 'Products sold', path: '/admin/reports/products' },
  { view: 'customers', label: 'Customers', path: '/admin/reports/customers' },
];

const SalesReport = ({ paid }: { paid: AdminOrder[] }) => {
  const now = new Date();
  // The last 12 months, oldest first
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
    const inMonth = paid.filter((o) => monthKey(orderDate(o)) === monthKey(date));
    const total = inMonth.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
    return { date, orders: inMonth.length, total, coupons: inMonth.filter((o) => o.couponCode).length };
  });
  const maxMonth = Math.max(...months.map((m) => m.orders), 1);
  const total = paid.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const withCoupon = paid.filter((o) => o.couponCode).length;
  const tableMonths = months.filter((m) => m.orders > 0).reverse();

  return (
    <>
      <p className="adm-report-line">
        {paid.length === 0
          ? 'No paid orders yet.'
          : total === 0
            ? `${plural(paid.length, 'paid order', 'paid orders')} so far, all of them free with a 100% coupon.`
            : `${rupees(total)} from ${plural(paid.length, 'paid order', 'paid orders')}, an average of ${rupees(total / paid.length)} per order. ${plural(withCoupon, 'order', 'orders')} used a coupon.`}
      </p>

      <section className="adm-panel" aria-labelledby="sales-chart-title">
        <div className="adm-panel-head">
          <h2 id="sales-chart-title" className="adm-panel-title">Orders per month</h2>
        </div>
        <div className="ov-chart">
          <div className="ov-bars" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }} role="list" aria-label="Paid orders per month">
            {months.map((m) => {
              const label = `${m.date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}: ${rupees(m.total)}, ${plural(m.orders, 'order', 'orders')}`;
              const current = monthKey(m.date) === monthKey(now);
              return (
                <div key={monthKey(m.date)} role="listitem" aria-label={label} title={label}
                  className={`ov-bar${current ? ' ov-bar-today' : ''}${m.orders > 0 ? ' ov-bar-has' : ''}`}>
                  <div className="ov-bar-fill" style={{ height: `${(m.orders / maxMonth) * 100}%` }} />
                </div>
              );
            })}
          </div>
          <div className="ov-days" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }} aria-hidden="true">
            {months.map((m) => (
              <span key={monthKey(m.date)} className={monthKey(m.date) === monthKey(now) ? 'is-today' : undefined}>
                {m.date.toLocaleDateString('en-IN', { month: 'short' })}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="adm-panel" aria-labelledby="sales-table-title">
        <div className="adm-panel-head">
          <h2 id="sales-table-title" className="adm-panel-title">Month by month</h2>
        </div>
        {tableMonths.length === 0 ? (
          <p className="adm-empty">Months with paid orders will be listed here.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col" className="num">Orders</th>
                  <th scope="col" className="num">Sales</th>
                  <th scope="col" className="num">Average order</th>
                  <th scope="col" className="num adm-hide-sm">With a coupon</th>
                </tr>
              </thead>
              <tbody>
                {tableMonths.map((m) => (
                  <tr key={monthKey(m.date)}>
                    <td className="adm-strong">{m.date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</td>
                    <td className="num">{m.orders}</td>
                    <td className="num">{rupees(m.total)}</td>
                    <td className="num">{rupees(m.total / m.orders)}</td>
                    <td className="num adm-hide-sm">{m.coupons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

const ProductsReport = ({ paid }: { paid: AdminOrder[] }) => {
  const { state } = useAppContext();
  const categoryOf = new Map(state.products.map((p) => [String(p._id || p.id), p.category]));

  const sold: Record<string, { name: string; image?: string; qty: number; orders: number; price: number; category: string }> = {};
  paid.forEach((o) => (o.orderItems || []).forEach((item) => {
    const key = item.product || item.name;
    sold[key] = sold[key] || {
      name: item.name, image: item.image, qty: 0, orders: 0, price: item.price || 0,
      category: (item.product && categoryOf.get(item.product)) || 'Other',
    };
    sold[key].qty += item.qty || 1;
    sold[key].orders += 1;
  }));
  const ranked = Object.values(sold).sort((a, b) => b.qty - a.qty);
  const pieces = ranked.reduce((sum, p) => sum + p.qty, 0);

  const byCategory: Record<string, number> = {};
  ranked.forEach((p) => { byCategory[p.category] = (byCategory[p.category] || 0) + p.qty; });
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <p className="adm-report-line">
        {pieces === 0
          ? 'Nothing sold yet.'
          : `${plural(pieces, 'piece', 'pieces')} sold across ${plural(ranked.length, 'product', 'products')}. Cancelled orders are left out.`}
      </p>

      {categories.length > 0 && (
        <section className="adm-panel" aria-labelledby="cat-title">
          <div className="adm-panel-head">
            <h2 id="cat-title" className="adm-panel-title">By category</h2>
          </div>
          <ul className="adm-share">
            {categories.map(([name, qty]) => (
              <li key={name}>
                <span className="adm-share-name">{name}</span>
                <span className="adm-share-bar" aria-hidden="true"><span style={{ width: `${(qty / pieces) * 100}%` }} /></span>
                <span className="adm-share-num">{qty} sold, {Math.round((qty / pieces) * 100)}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="adm-panel adm-products" aria-labelledby="rank-title">
        <div className="adm-panel-head">
          <h2 id="rank-title" className="adm-panel-title">Every product sold</h2>
        </div>
        {ranked.length === 0 ? (
          <p className="adm-empty">Products will be ranked here once orders come in.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col" className="adm-hide-md">Category</th>
                  <th scope="col" className="num">Sold</th>
                  <th scope="col" className="num adm-hide-sm">Orders</th>
                  <th scope="col" className="num adm-hide-sm">Shop price</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <div className="adm-item">
                        {p.image ? <img className="adm-thumb" src={getImageUrl(p.image, 120)} alt="" loading="lazy" /> : <span className="adm-thumb" />}
                        <span className="adm-item-name adm-strong">{splitProductName(p.name).title}</span>
                      </div>
                    </td>
                    <td className="adm-hide-md"><span className="adm-tag">{p.category}</span></td>
                    <td className="num">{p.qty}</td>
                    <td className="num adm-hide-sm">{p.orders}</td>
                    <td className="num adm-hide-sm">{rupees(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

const CustomersReport = ({ paid }: { paid: AdminOrder[] }) => {
  const people: Record<string, { name: string; contact: string; city: string; orders: number; spent: number; last: Date }> = {};
  paid.forEach((o) => {
    const a = o.shippingAddress || {};
    const key = (a.email || a.phoneNumber || customerName(o)).toLowerCase();
    const when = orderDate(o);
    const person = people[key] || { name: customerName(o), contact: a.email || a.phoneNumber || '', city: a.city || '', orders: 0, spent: 0, last: when };
    person.orders += 1;
    person.spent += o.totalPrice || 0;
    if (when > person.last) person.last = when;
    people[key] = person;
  });
  const ranked = Object.values(people).sort((a, b) => b.orders - a.orders || b.spent - a.spent);
  const repeat = ranked.filter((p) => p.orders > 1).length;

  return (
    <>
      <p className="adm-report-line">
        {ranked.length === 0
          ? 'No customers have paid for an order yet.'
          : `${plural(ranked.length, 'customer has', 'customers have')} ordered. ${repeat === 0 ? 'None have come back yet.' : `${plural(repeat, 'has', 'have')} ordered more than once.`}`}
      </p>

      <section className="adm-panel" aria-labelledby="cust-title">
        <div className="adm-panel-head">
          <h2 id="cust-title" className="adm-panel-title">Customers, most orders first</h2>
        </div>
        {ranked.length === 0 ? (
          <p className="adm-empty">Customers will be listed here once orders come in.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Customer</th>
                  <th scope="col" className="adm-hide-sm">City</th>
                  <th scope="col" className="num">Orders</th>
                  <th scope="col" className="num">Spent</th>
                  <th scope="col" className="adm-hide-sm">Last order</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((p) => (
                  <tr key={`${p.name}-${p.contact}`}>
                    <td>
                      <span className="adm-strong">{p.name}</span>
                      {p.contact && <span className="adm-sub">{p.contact}</span>}
                    </td>
                    <td className="adm-hide-sm">{p.city}</td>
                    <td className="num">{p.orders}</td>
                    <td className="num">{p.spent ? rupees(p.spent) : <span className="adm-quiet">Free</span>}</td>
                    <td className="adm-hide-sm" style={{ whiteSpace: 'nowrap' }}>{shortDate(p.last)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

const AdminReports = ({ view }: { view: ReportView }) => {
  const { orders, loading, error } = useOutletContext<AdminSummary>();
  const paid = orders.filter((o) => o.isPaid && o.status !== 'Cancelled');

  return (
    <div className="adm-page">
      <div className="adm-head">
        <div>
          <h1>Reports</h1>
          <p className="adm-head-note">Worked out from paid orders. Cancelled orders and unfinished checkouts are left out.</p>
        </div>
      </div>

      <nav className="adm-chips" aria-label="Reports">
        {TABS.map((tab) => (
          <NavLink key={tab.view} to={tab.path} className="adm-chip" aria-current={view === tab.view ? 'page' : undefined}>
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {error && <div className="adm-error" role="alert">Orders could not be loaded. Check the internet connection and refresh the page.</div>}

      {loading ? (
        <p className="adm-report-line">Loading orders…</p>
      ) : view === 'sales' ? (
        <SalesReport paid={paid} />
      ) : view === 'products' ? (
        <ProductsReport paid={paid} />
      ) : (
        <CustomersReport paid={paid} />
      )}
    </div>
  );
};

export default AdminReports;
