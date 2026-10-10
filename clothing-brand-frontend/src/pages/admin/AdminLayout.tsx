import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Package, Ticket, Users,
  Image as ImageIcon, Tag, BarChart2, PieChart, LineChart,
  Settings, UsersRound, ShieldCheck, LogOut, Menu, X,
  ExternalLink, MessageSquare, Inbox, Store, Images
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { hasOpenExchange, needsShipping, useAdminSummary } from './adminData';
import './admin.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, dispatch } = useAppContext();

  // Admin pages need a logged-in admin with a valid token (the API checks it on every call).
  // This also runs when the session expires, sending the admin back to the login page.
  const isAdminSession = Boolean(state.user?.isAdmin && state.user?.token);
  useEffect(() => {
    if (!isAdminSession) {
      navigate('/login?redirect=/admin', { replace: true });
    }
  }, [isAdminSession, navigate]);

  const summary = useAdminSummary(isAdminSession, location.pathname);

  // The phone drawer closes after picking a page, and with the Escape key
  const closeSidebar = () => setSidebarOpen(false);
  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSidebarOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sidebarOpen]);

  if (!isAdminSession) {
    return <div className="adm" style={{ alignItems: 'center', justifyContent: 'center' }}>Loading…</div>;
  }

  const toShip = summary.orders.filter(needsShipping).length;
  const exchanges = summary.orders.filter(hasOpenExchange).length;

  const navGroups = [
    {
      title: 'Store',
      items: [
        { path: '/admin/orders', name: 'Orders', icon: Ticket, count: toShip + exchanges },
        { path: '/admin/products', name: 'Products', icon: ShoppingBag },
        { path: '/admin/first-photo', name: 'First photo editor', icon: Images },
        { path: '/admin/inventory', name: 'Inventory', icon: Package },
        { path: '/admin/customers', name: 'Customers', icon: Users },
        { path: '/admin/reviews', name: 'Reviews', icon: MessageSquare, count: summary.pendingReviews },
        { path: '/admin/messages', name: 'Messages', icon: Inbox, count: summary.unreadMessages },
      ],
    },
    {
      title: 'Marketing',
      items: [
        { path: '/admin/banners', name: 'Banners', icon: ImageIcon },
        { path: '/admin/promotions', name: 'Promotions', icon: Tag },
        { path: '/admin/google-shopping', name: 'Google Shopping', icon: Store },
      ],
    },
    {
      title: 'Reports',
      items: [
        { path: '/admin/reports/sales', name: 'Sales', icon: BarChart2 },
        { path: '/admin/reports/products', name: 'Products sold', icon: PieChart },
        { path: '/admin/reports/customers', name: 'Customers', icon: LineChart },
      ],
    },
    {
      title: 'Settings',
      items: [
        { path: '/admin/settings', name: 'Store settings', icon: Settings },
        { path: '/admin/users', name: 'Users', icon: UsersRound },
        { path: '/admin/roles', name: 'Roles', icon: ShieldCheck },
      ],
    },
  ];

  const navClass = ({ isActive }: { isActive: boolean }) => `adm-nav-link${isActive ? ' active' : ''}`;

  return (
    <div className="adm">
      <a href="#adm-main" className="adm-skip">Skip to content</a>

      <aside id="adm-sidebar" className={`adm-side${sidebarOpen ? ' is-open' : ''}`} aria-label="Admin">
        <Link to="/admin" className="adm-brand" onClick={closeSidebar}>
          <span className="adm-brand-name">Gul Fashion</span>
          <span className="adm-brand-sub">Back office</span>
        </Link>

        <nav className="adm-nav">
          <NavLink to="/admin" end className={navClass} onClick={closeSidebar}>
            <LayoutDashboard aria-hidden="true" />
            <span>Overview</span>
          </NavLink>

          {navGroups.map((group) => (
            <div key={group.title} className="adm-nav-group">
              <p className="adm-nav-title">{group.title}</p>
              {group.items.map((item) => (
                <NavLink key={item.path} to={item.path} className={navClass} onClick={closeSidebar}>
                  <item.icon aria-hidden="true" />
                  <span>{item.name}</span>
                  {item.count ? (
                    <span className="adm-count" aria-label={`${item.count} waiting`}>{item.count}</span>
                  ) : null}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-side-foot">
          <div className="adm-user">
            <div className="adm-user-name">{state.user?.name || 'Admin'}</div>
            <div className="adm-user-email">{state.user?.email}</div>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" />
            View store
          </a>
          <button type="button" onClick={() => dispatch({ type: 'LOGOUT' })}>
            <LogOut aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button type="button" className="adm-scrim" aria-label="Close menu" onClick={closeSidebar} />
      )}

      <div className="adm-body">
        <header className="adm-topbar">
          <button
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={sidebarOpen}
            aria-controls="adm-sidebar"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="adm-topbar-title">Gul Fashion</span>
          <a href="/" target="_blank" rel="noopener noreferrer" aria-label="View store">
            <ExternalLink size={20} />
          </a>
        </header>

        <main id="adm-main" className="adm-main" tabIndex={-1}>
          <Outlet context={summary} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
