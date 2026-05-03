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
        <div className="container flex justify-between items-center text-xs">
          <span className="hidden-mobile">Free Shipping on Prepaid Orders Within India</span>
          <span className="mobile-only text-center w-full">Free Shipping Above ₹1999</span>
          <div className="top-links flex gap-4 hidden-mobile">
            <Link to="/track-order">Track Order</Link>
            <Link to="/faq">Help & Support</Link>
          </div>
        </div>
      </div>
      
      <div className="header-main-container bg-white">
        <div className="container flex justify-between items-center py-4">
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="logo-container">
            <Link to="/" className="flex items-center" style={{textDecoration: 'none'}}>
              <svg width="45" height="55" viewBox="0 0 100 120" style={{color: 'var(--primary-color)'}} fill="currentColor">
                <circle cx="40" cy="15" r="7" />
                <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
              </svg>
              <div style={{marginLeft: '-8px', display: 'flex', flexDirection: 'column'}}>
                <span style={{fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 600, color: 'var(--primary-color)', lineHeight: '0.9'}}>Gul</span>
                <span style={{fontSize: '0.55rem', fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '5px', color: '#333', marginTop: '2px'}}>FASHION</span>
              </div>
            </Link>
          </div>

          <nav className="desktop-nav hidden-mobile">
            <ul className="flex gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="nav-link-desktop">{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-icons flex items-center gap-4">
            <div className="search-container relative hidden-mobile">
              <form onSubmit={submitSearch} className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => { if(searchTerm.length > 1) setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all"
                />
                <button type="submit" className="text-gray-400 hover:text-primary-red transition-colors">
                  <Search size={18} />
                </button>
              </form>
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-dropdown absolute bg-white shadow-xl border rounded-lg mt-2 right-0 w-72 z-[1100]">
                  {suggestions.map(item => (
                    <Link 
                      key={item._id} 
                      to={`/product/${item._id}`} 
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-md" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{item.name}</p>
                        <span className="text-[10px] text-primary-red uppercase font-bold">{item.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to={user ? "/profile" : "/login"} className="header-icon-link">
              <User size={22} />
            </Link>
            <Link to="/cart" className="header-icon-link relative">
              <ShoppingBag size={22} />
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <nav className={`mobile-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-serif text-xl">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          <ul className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className="text-lg font-medium block"
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
