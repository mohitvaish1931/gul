import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const location = useLocation();
  const { state } = useAppContext();
  const cartItemCount = state.cart.reduce((total: number, item: any) => total + item.quantity, 0);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Category', icon: Grid },
    { path: '/cart', label: 'Cart', icon: ShoppingBag, badge: cartItemCount },
    { path: '/profile', label: 'Account', icon: User },
  ];

  return (
    <div className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || 
                         (item.path === '/shop' && location.pathname.startsWith('/shop'));
        
        return (
          <Link to={item.path} key={item.label} className={`nav-item ${isActive ? 'active' : ''}`}>
            <div className="icon-wrapper">
              <Icon className="nav-icon" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </div>
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
