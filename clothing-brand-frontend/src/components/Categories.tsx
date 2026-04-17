
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  return (
    <section className="section categories-masonry-section" style={{padding: '0'}}>
      <div className="categories-masonry">
        
        {/* Left Large Column */}
        <Link to="/shop?keyword=Sarees" className="cat-card cat-sarees">
          <img src="/images/saree-category.png" alt="Sarees" className="cat-bg-img" loading="lazy" />
          <div className="cat-overlay"></div>
          <div className="cat-text-content">
            <h3 className="cat-title font-serif">Sarees</h3>
            <span className="cat-subtitle">400+ STYLES</span>
          </div>
        </Link>

        {/* Right Top Left */}
        <Link to="/shop?keyword=Lehengas" className="cat-card cat-lehengas">
          <img src="/images/bridal-edit.png" alt="Lehengas" className="cat-bg-img" loading="lazy" />
          <div className="cat-overlay"></div>
          <div className="cat-text-content">
            <h3 className="cat-title font-serif">Lehengas</h3>
            <span className="cat-subtitle">200+ STYLES</span>
          </div>
        </Link>

        {/* Right Top Right */}
        <Link to="/shop?keyword=Suits" className="cat-card cat-suits">
          <img src="/images/suits-category.png" alt="Suits" className="cat-bg-img" loading="lazy" />
          <div className="cat-overlay"></div>
          <div className="cat-text-content">
            <h3 className="cat-title font-serif">Suits</h3>
            <span className="cat-subtitle">500+ STYLES</span>
          </div>
        </Link>

        {/* Right Bottom Left */}
        <Link to="/shop?keyword=Indowestern" className="cat-card cat-indowestern">
          <img src="/images/indowestern-category.png" alt="Indowestern" className="cat-bg-img" loading="lazy" />
          <div className="cat-overlay"></div>
          <div className="cat-text-content">
            <h3 className="cat-title font-serif">Indowestern</h3>
            <span className="cat-subtitle">150+ STYLES</span>
          </div>
        </Link>

        {/* Right Bottom Right */}
        <Link to="/shop?keyword=Kurtas" className="cat-card cat-kurtas">
          <img src="/images/kurta-category.png" alt="Kurtas" className="cat-bg-img" loading="lazy" />
          <div className="cat-overlay"></div>
          <div className="cat-text-content">
            <h3 className="cat-title font-serif">Kurtas</h3>
            <span className="cat-subtitle">150+ STYLES</span>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Categories;
