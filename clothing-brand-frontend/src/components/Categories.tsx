import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  return (
    <section className="section categories-masonry-section" style={{padding: '0'}}>
      <div className="categories-masonry-dual">
        
        {/* Left: Kurta Sets */}
        <Link to="/shop?keyword=Kurta" className="cat-card-purple">
          <img src="/images/kurta-category.png" alt="Kurta Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">THE ETHNIC EDIT</span>
            <h3 className="cat-title-purple font-serif">Kurta Sets</h3>
            <p className="cat-desc-purple">Timeless craftsmanship meets modern silhouettes.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Right: Suits */}
        <Link to="/shop?keyword=Suit" className="cat-card-purple">
          <img src="/images/suits-category.png" alt="Suits" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">DESIGNER FAVORITES</span>
            <h3 className="cat-title-purple font-serif">Suits</h3>
            <p className="cat-desc-purple">Regal elegance for every precious occasion.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Categories;
