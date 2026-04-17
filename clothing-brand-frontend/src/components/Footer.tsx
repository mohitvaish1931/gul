
import './Footer.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="flex items-center" style={{marginBottom: '20px'}}>
              <svg width="45" height="55" viewBox="0 0 100 120" style={{color: 'var(--primary-color)'}} fill="currentColor">
                <circle cx="40" cy="15" r="7" />
                <path d="M40 25 C 30 35, 20 40, 10 75 C 5 95, 10 110, 25 115 C 30 116, 35 110, 30 100 C 25 90, 25 60, 45 40 C 45 50, 40 85, 55 105 C 60 110, 65 105, 60 95 C 55 80, 50 50, 60 40 C 80 50, 95 60, 90 85 C 80 65, 60 55, 60 55 C 60 55, 75 75, 70 85 C 60 70, 50 65, 50 65 C 50 65, 45 25, 40 25 Z" />
              </svg>
              <div style={{marginLeft: '-10px', display: 'flex', flexDirection: 'column'}}>
                <span style={{fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 600, letterSpacing: '0px', color: 'var(--primary-color)', lineHeight: '1'}}>Gul</span>
                <span style={{fontSize: '0.6rem', fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '5px', color: '#fff', marginLeft: '5px', marginTop: '-2px'}}>FASHION</span>
              </div>
            </div>
            <p className="footer-desc">
              Experience the royal legacy of Jaipur with our exquisite handcrafted ethnic wear for women.
            </p>
            <div className="social-links">
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><a href="#">Sarees</a></li>
              <li><a href="#">Lehengas</a></li>
              <li><a href="#">Kurta Sets</a></li>
              <li><a href="#">Suits</a></li>
              <li><a href="#">Bridal Collection</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-desc" style={{marginBottom: '15px'}}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" className="newsletter-input" />
              <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '10px'}}>Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GUL FASHION. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
