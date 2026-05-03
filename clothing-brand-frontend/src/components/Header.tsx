import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sarees', path: '/shop?keyword=Saree' },
    { name: 'Kurta Sets', path: '/shop?keyword=Kurta' },
    { name: 'Suits', path: '/shop?keyword=Suit' },
    { name: 'Lehengas', path: '/shop?keyword=Lehenga' },
    { name: 'Bridal', path: '/shop?keyword=Bridal' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-top-bar">
        <div className="container flex justify-between items-center">
          <span className="promo-text">FREE SHIPPING ON PREPAID ORDERS WITHIN INDIA</span>
          <div className="top-links flex gap-6">
            <Link to="/track-order">TRACK ORDER</Link>
            <Link to="/faq">HELP & SUPPORT</Link>
          </div>
        </div>
      </div>
      
      <div className="header-main-middle bg-white">
        <div className="container grid grid-cols-3 items-center py-6">
          {/* Left: Search */}
          <div className="search-container relative hidden-mobile">
            <form onSubmit={submitSearch} className="flex items-center border-b border-gray-200 py-1 w-48">
              <input 
                type="text" 
                placeholder="SEARCH..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => { if(searchTerm.length > 1) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest w-full"
              />
              <button type="submit" className="text-gray-400">
                <Search size={16} />
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-dropdown absolute bg-white shadow-2xl border rounded-sm mt-4 left-0 w-80 z-[1100]">
                {suggestions.map(item => (
                  <Link 
                    key={item._id} 
                    to={`/product/${item._id}`} 
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">{item.name}</p>
                      <span className="text-[9px] text-primary-red uppercase font-bold tracking-widest">{item.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button 
            className="mobile-menu-btn block lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Center: Logo */}
          <div className="logo-wrapper flex justify-center">
            <Link to="/" className="flex items-center flex-col">
              <div className="flex items-center">
                <svg width="40" height="50" viewBox="0 0 100 120" style={{color: 'var(--primary-color)'}} fill="currentColor">
                  <circle cx="40" cy="15" r="7" />
                  <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
                </svg>
                <span className="logo-text">Gul</span>
              </div>
              <span className="logo-sub-text">FASHION</span>
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="header-icons flex justify-end items-center gap-6">
            <Link to={user ? "/profile" : "/login"} className="header-icon-link">
              <User size={20} />
            </Link>
            <Link to="/cart" className="header-icon-link relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom: Navigation */}
      <nav className="header-nav-bottom bg-white border-t border-gray-50 hidden-mobile">
        <div className="container">
          <ul className="flex justify-center gap-12 py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="nav-link-item">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <nav className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-10">
            <span className="font-serif text-2xl">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          <ul className="space-y-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="text-xl font-medium block uppercase tracking-widest"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
