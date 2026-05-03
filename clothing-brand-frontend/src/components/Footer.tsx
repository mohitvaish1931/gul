import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-purple">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="flex items-center" style={{marginBottom: '20px'}}>
              <svg width="40" height="50" viewBox="0 0 100 120" style={{color: 'var(--primary-purple)'}} fill="currentColor">
                <circle cx="40" cy="15" r="7" />
                <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
              </svg>
              <div style={{marginLeft: '-8px', display: 'flex', flexDirection: 'column'}}>
                <span className="footer-logo-text">Gul</span>
                <span className="footer-logo-subtext">FASHION</span>
              </div>
            </div>
            <p className="footer-desc-purple">
              Experience the royal legacy of Jaipur with our exquisite handcrafted ethnic wear for women.
            </p>
            <div className="social-links-purple">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
                <a href={`https://${platform}.com`} key={platform} target="_blank" rel="noreferrer">
                  <span className="capitalize">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading-purple">Collections</h4>
            <ul className="footer-links-purple">
              <li><Link to="/shop?keyword=Kurta">Kurta Sets</Link></li>
              <li><Link to="/shop?keyword=Suits">Designer Suits</Link></li>
              <li><Link to="/shop">All Collections</Link></li>
              <li><Link to="/shop?keyword=New">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading-purple">Concierge</h4>
            <ul className="footer-links-purple">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/track-order">Track Your Order</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Returns & Refunds</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading-purple">Join Our World</h4>
            <p className="footer-desc-purple" style={{marginBottom: '15px'}}>
              Stay updated with our latest releases and exclusive styling tips.
            </p>
            <form className="newsletter-form-purple">
              <input type="email" placeholder="Enter your email" className="newsletter-input-purple" />
              <button type="submit" className="btn-purple-submit">Join Now</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom-purple">
          <p>&copy; {new Date().getFullYear()} GUL FASHION JAIPUR. Handcrafted with Love.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
