import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, Phone, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { user, cart } = state;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length > 1) {
        try {
          const res = await fetch(`/api/products?keyword=${searchTerm}`);
          const data = await res.json();
          setSuggestions(Array.isArray(data) ? data.slice(0, 4) : []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Suggestions failed", error);
        }
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if(searchTerm.trim()) {
      navigate(`/shop?keyword=${searchTerm}`);
    } else {
      navigate(`/shop`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150); // Increased threshold to avoid jump
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kurta Sets', path: '/shop?keyword=Kurta' },
    { name: 'Suits', path: '/shop?keyword=Suit' },
    { name: 'Track Order', path: '/track-order', icon: <Truck size={14} /> },
    { name: 'Contact Us', path: '/contact', icon: <Phone size={14} /> }
  ];

  return (
    <>
      {/* Main Header (Scrolls away) */}
      <header className={`header-main ${isScrolled ? 'header-hidden' : ''}`}>
        <div className="header-top-bar">
          <div className="container flex justify-center items-center">
            <span className="promo-text">FREE SHIPPING ON PREPAID ORDERS WITHIN INDIA</span>
          </div>
        </div>
        
        <div className="header-main-middle">
          <div className="container header-grid">
            {/* Left: Search */}
            <div className="header-left">
              <form onSubmit={submitSearch} className="search-form">
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => { if(searchTerm.length > 1) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <Search size={16} />
                </button>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-dropdown">
                  {suggestions.map(item => (
                    <Link 
                      key={item._id} 
                      to={`/product/${item._id}`} 
                      className="suggestion-item"
                    >
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p className="suggestion-name">{item.name}</p>
                        <span className="suggestion-cat">{item.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Center: Main Logo */}
            <div className="header-center">
              <Link to="/" className="main-logo">
                <div className="logo-top">
                  <svg width="35" height="45" viewBox="0 0 100 120" className="logo-svg" fill="currentColor">
                    <circle cx="40" cy="15" r="7" />
                    <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
                  </svg>
                  <span className="logo-text">Gul</span>
                </div>
                <span className="logo-sub">FASHION</span>
              </Link>
            </div>

            {/* Right: Icons */}
            <div className="header-right">
              <Link to={user ? "/profile" : "/login"} className="header-icon-link">
                <User size={20} />
              </Link>
              <Link to="/cart" className="header-icon-link cart-link">
                <ShoppingBag size={20} />
                {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation (Becomes Sticky) */}
      <nav className={`header-nav ${isScrolled ? 'nav-sticky' : ''}`}>
        <div className="container nav-container">
          {isScrolled && (
            <Link to="/" className="mini-logo">
               <svg width="25" height="30" viewBox="0 0 100 120" fill="currentColor">
                  <circle cx="40" cy="15" r="7" />
                  <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
                </svg>
                <span className="mini-logo-text">Gul</span>
            </Link>
          )}
          
          <ul className="nav-list">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path} className="nav-link">
                  {link.icon && <span className="nav-icon">{link.icon}</span>}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {isScrolled && (
            <div className="nav-icons-mini">
              <Link to="/cart" className="nav-icon-link">
                <ShoppingBag size={18} />
                {cart.length > 0 && <span className="cart-badge-mini">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
           <span className="logo-text" style={{fontSize: '1.5rem'}}>Gul</span>
           <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
        </div>
        <ul className="mobile-nav-list">
          {navLinks.map((link, idx) => (
            <li key={idx} onClick={() => setMobileMenuOpen(false)}>
              <Link to={link.path} className="mobile-nav-link">
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <li onClick={() => setMobileMenuOpen(false)}>
            <Link to={user ? "/profile" : "/login"} className="mobile-nav-link">
              <User size={20} />
              <span>{user ? 'My Profile' : 'Login / Register'}</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
