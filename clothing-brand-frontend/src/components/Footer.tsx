import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-purple">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="flex items-center" style={{marginBottom: '20px'}}>
              <img src={logoImg} alt="Gul Fashion Logo" style={{ height: '60px', width: '220px', objectFit: 'cover', objectPosition: 'center', mixBlendMode: 'multiply' }} />
            </div>
            <p className="footer-desc-purple">
              Experience the royal legacy of Jaipur with our exquisite handcrafted ethnic wear for women.
            </p>
            <div className="social-links-purple">
              <a href="https://wa.me/919351325459" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:gul.fashion.jaipur@gmail.com" aria-label="Email us" title="Email">
                <Mail size={18} />
              </a>
              <a href="tel:+919351325459" aria-label="Call us" title="Call">
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading-purple">Collections</h4>
            <ul className="footer-links-purple">
              <li><Link to="/shop?category=Kurta%20Sets">Kurta Sets</Link></li>
              <li><Link to="/shop?category=Suit%20Sets">Suit Sets</Link></li>
              <li><Link to="/shop?category=Tops">Tops & Tunics</Link></li>
              <li><Link to="/shop?category=Maxis%20%26%20Dresses">Maxis & Dresses</Link></li>
              <li><Link to="/shop">All Collections</Link></li>
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
            <a
              href={`https://wa.me/919351325459?text=${encodeURIComponent('Hi Gul Fashion! Please send me updates about new arrivals and offers.')}`}
              target="_blank"
              rel="noreferrer"
              className="btn-purple-submit"
              style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
            >
              Get Updates on WhatsApp
            </a>
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
