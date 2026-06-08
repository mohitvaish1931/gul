import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, Phone, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { API_ENDPOINTS } from '../utils/api';
import { getImageUrl } from '../utils/mediaHelper';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
          const res = await fetch(`${API_ENDPOINTS.PRODUCTS}?keyword=${searchTerm}`);
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
      const currentScrollY = window.scrollY;
      
      // Determine if sticky nav should activate
      setIsScrolled(currentScrollY > 150);
      
      // Show/Hide sticky header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kurta Sets', path: '/shop?category=Kurta%20Sets' },
    { name: 'Suits', path: '/shop?category=Suits' },
    { name: 'Tops', path: '/shop?category=Tops' },
    { name: 'Three Piece Tops', path: '/shop?category=Three%20Piece%20Tops' },
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
            {/* Left: Logo */}
            <div className="header-left">
              <Link to="/" className="main-logo">
                <div className="logo-top">
                  <svg width="30" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.2" />
                    <path d="M12 5C9 9 6 10 6 13.5C6 17 8.5 19 12 19C15.5 19 18 17 18 13.5C18 10 15 9 12 5Z" />
                    <path d="M12 9C10.5 11.5 8.5 12 8.5 14C8.5 16 10 17 12 17C14 17 15.5 16 15.5 14C15.5 12 13.5 11.5 12 9Z" />
                    <path d="M12 12.5C11.5 13.5 10.5 13.7 10.5 14.5C10.5 15.3 11.2 15.7 12 15.7C12.8 15.7 13.5 15.3 13.5 14.5C13.5 13.7 12.5 13.5 12 12.5Z" />
                  </svg>
                  <span className="logo-text">Gul</span>
                </div>
                <span className="logo-sub">FASHION</span>
              </Link>
            </div>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Center: Search */}
            <div className="header-center">
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
                <div className="search-dropdown" onMouseDown={(e) => e.preventDefault()}>
                  {suggestions.map(item => (
                    <Link 
                      key={item._id} 
                      to={`/product/${item._id}`} 
                      className="suggestion-item"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSearchTerm('');
                      }}
                    >
                      <img src={getImageUrl(item.image)} alt={item.name} />
                      <div>
                        <p className="suggestion-name">{item.name}</p>
                        <span className="suggestion-cat">{item.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Icons */}
            <div className="header-right">
              {/* Mobile Search Toggle Icon */}
              <button 
                type="button" 
                className="header-icon-link mobile-search-toggle"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                title="Toggle Search"
              >
                <Search size={20} />
              </button>

              <Link to={user ? "/profile" : "/login"} className="header-icon-link">
                <User size={20} />
              </Link>
              {user && user.isAdmin && (
                <Link to="/admin" className="header-icon-link" title="Admin Panel" style={{ color: '#6B21A8' }}>
                  <ShieldCheck size={20} />
                </Link>
              )}
              <Link to="/cart" className="header-icon-link cart-link">
                <ShoppingBag size={20} />
                {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar Row (slides down) */}
      <div className={`mobile-search-bar-row ${mobileSearchOpen ? 'open' : ''}`}>
        <div className="container" style={{ position: 'relative' }}>
          <form onSubmit={submitSearch} className="mobile-search-form">
            <input 
              type="text" 
              placeholder="SEARCH THE STORE..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => { if(searchTerm.length > 1) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn">
              <Search size={18} />
            </button>
            <button 
              type="button" 
              className="mobile-search-close"
              onClick={() => {
                setMobileSearchOpen(false);
                setSearchTerm('');
              }}
            >
              <X size={18} />
            </button>
          </form>
          
          {showSuggestions && suggestions.length > 0 && (
            <div className="mobile-search-dropdown" onMouseDown={(e) => e.preventDefault()}>
              {suggestions.map(item => (
                <Link 
                  key={item._id} 
                  to={`/product/${item._id}`} 
                  className="suggestion-item"
                  onClick={() => {
                    setShowSuggestions(false);
                    setMobileSearchOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <img src={getImageUrl(item.image)} alt={item.name} />
                  <div>
                    <p className="suggestion-name">{item.name}</p>
                    <span className="suggestion-cat">{item.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation (Becomes Sticky) */}
      <nav className={`header-nav ${isScrolled ? 'nav-sticky' : ''} ${isScrolled && !showHeader ? 'nav-hidden' : ''}`}>
        <div className="container nav-container">
          {isScrolled && (
            <Link to="/" className="mini-logo">
               <svg width="22" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mini-logo-svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="0.5" strokeDasharray="1 1" opacity="0.2" />
                  <path d="M12 5C9 9 6 10 6 13.5C6 17 8.5 19 12 19C15.5 19 18 17 18 13.5C18 10 15 9 12 5Z" />
                  <path d="M12 9C10.5 11.5 8.5 12 8.5 14C8.5 16 10 17 12 17C14 17 15.5 16 15.5 14C15.5 12 13.5 11.5 12 9Z" />
                  <path d="M12 12.5C11.5 13.5 10.5 13.7 10.5 14.5C10.5 15.3 11.2 15.7 12 15.7C12.8 15.7 13.5 15.3 13.5 14.5C13.5 13.7 12.5 13.5 12 12.5Z" />
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
          {user && user.isAdmin && (
            <li onClick={() => setMobileMenuOpen(false)}>
              <Link to="/admin" className="mobile-nav-link" style={{ color: '#6B21A8', fontWeight: 700 }}>
                <ShieldCheck size={20} />
                <span>Admin Panel</span>
              </Link>
            </li>
          )}
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
