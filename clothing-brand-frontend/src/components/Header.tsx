import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
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

  const submitSearch = (e) => {
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
          <span>Free Shipping on Prepaid Orders Within India</span>
          <div className="top-links flex gap-2">
            <a href="#">Track Order</a> | <a href="#">Help & Support</a>
          </div>
        </div>
      </div>
      
      <div className="header-main container flex justify-between items-center">
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="logo-container">
          <Link to="/" className="flex items-center" style={{textDecoration: 'none'}}>
            {/* Custom SVG approximating the dress silhouette from business card */}
            <svg width="55" height="65" viewBox="0 0 100 120" style={{color: 'var(--primary-color)'}} fill="currentColor">
              <circle cx="40" cy="15" r="7" />
              <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
            </svg>
            <div style={{marginLeft: '-10px', display: 'flex', flexDirection: 'column'}}>
              <span style={{fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', fontWeight: 600, letterSpacing: '0px', color: 'var(--primary-color)', lineHeight: '1'}}>Gul</span>
              <span style={{fontSize: '0.65rem', fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '7px', color: '#333', marginLeft: '5px', marginTop: '-2px'}}>FASHION</span>
            </div>
          </Link>
        </div>

        <div className="header-icons flex items-center gap-2">
          <div className="search-container relative">
            <form onSubmit={submitSearch} className="flex items-center" style={{borderBottom: '1px solid #ddd', padding: '2px'}}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => { if(searchTerm.length > 1) setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                style={{border: 'none', outline: 'none', background: 'transparent', width: '120px', fontSize: '0.85rem'}}
                className="hidden-mobile"
              />
              <button type="submit" className="icon-btn"><Search size={20} /></button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-dropdown absolute bg-white shadow-lg border rounded-sm" style={{top: '100%', right: '0', width: '250px', zIndex: 100, marginTop: '10px'}}>
                {suggestions.map(item => (
                  <Link 
                    key={item._id} 
                    to={`/product/${item._id}`} 
                    className="flex items-center gap-3 hover:bg-gray-50"
                    style={{padding: '10px', borderBottom: '1px solid #eee', textDecoration: 'none'}}
                  >
                    <img src={item.image} alt={item.name} style={{width: '40px', height: '50px', objectFit: 'cover', borderRadius: '2px'}} />
                    <div style={{textAlign: 'left', flex: 1}}>
                      <p style={{fontSize: '0.8rem', fontWeight: 600, color: '#333', margin: '0 0 4px 0', lineHeight: 1.2}}>
                        {item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name}
                      </p>
                      <span className="font-serif" style={{fontSize: '0.7rem', color: 'var(--primary-color)'}}>{item.category}</span>
                    </div>
                  </Link>
                ))}
                <div 
                  onClick={submitSearch}
                  style={{padding: '10px', fontSize: '0.75rem', textAlign: 'center', cursor: 'pointer', backgroundColor: '#fcfcfc', color: '#666'}}
                  className="hover:text-primary"
                >
                  See all results for "{searchTerm}"
                </div>
              </div>
            )}
          </div>
          <Link to={user ? "/profile" : "/login"} className="icon-btn hidden-mobile">
            {user ? (
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>
                {user.name.split(' ')[0]}
              </span>
            ) : (
              <User size={20} />
            )}
          </Link>
          <Link to="/cart" className="icon-btn relative">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
          </Link>
        </div>
      </div>

      <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="nav-list flex justify-center">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-item">
              <Link to={link.path} className="nav-link">{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
