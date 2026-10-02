import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

const LINK_GROUPS = [
  {
    title: 'Shop',
    links: [
      { to: '/shop?category=Kurta%20Sets', label: 'Kurta sets' },
      { to: '/shop?category=Suit%20Sets', label: 'Suit sets' },
      { to: '/shop?category=Tops', label: 'Tops and short kurtis' },
      { to: '/shop?category=Maxis%20%26%20Dresses', label: 'Maxis and dresses' },
      { to: '/shop', label: 'Everything' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/track-order', label: 'Track your order' },
      { to: '/shipping-policy', label: 'Shipping' },
      { to: '/refund-policy', label: 'Exchanges and returns' },
      { to: '/faq', label: 'FAQs' },
      { to: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Gul Fashion',
    links: [
      { to: '/about', label: 'Our story' },
      { to: '/care-guide', label: 'Garment care' },
      { to: '/privacy-policy', label: 'Privacy policy' },
      { to: '/terms-conditions', label: 'Terms and conditions' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logoImg} alt="Gul Fashion" className="footer-logo" />
          <p className="footer-statement">
            Women's kurta sets, suits and everyday cottons, designed and finished at our studio in Jaipur.
          </p>
          <ul className="footer-contact">
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>455, Mandhi Khatikan, Pahadiya Chowk, Jaipur 302002</span>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href="tel:+919351325459">+91 93513 25459</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:gul.fashion.jaipur@gmail.com">gul.fashion.jaipur@gmail.com</a>
            </li>
          </ul>
          <a
            href={`https://wa.me/919351325459?text=${encodeURIComponent('Hi Gul Fashion! Please send me updates about new arrivals and offers.')}`}
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            <MessageCircle size={16} aria-hidden="true" /> Get new arrivals on WhatsApp
          </a>
        </div>

        {LINK_GROUPS.map((group) => (
          <nav key={group.title} className="footer-group" aria-label={group.title}>
            <h2 className="footer-heading">{group.title}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Gul Fashion, Jaipur · Est. 2005</p>
        <p>Secure payments by Razorpay · Free shipping across India</p>
      </div>
    </footer>
  );
};

export default Footer;
