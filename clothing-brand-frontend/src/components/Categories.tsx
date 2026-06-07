import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  return (
    <section className="section categories-masonry-section" style={{padding: '0'}}>
      <div className="categories-masonry-dual">
        
        {/* Kurta Sets */}
        <Link to="/shop?category=Kurta%20Sets" className="cat-card-purple">
          <img src="/images/kurta-category.png" alt="Kurta Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">THE ETHNIC EDIT</span>
            <h3 className="cat-title-purple font-serif">Kurta Sets</h3>
            <p className="cat-desc-purple">Timeless craftsmanship meets modern silhouettes.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Suits */}
        <Link to="/shop?category=Suits" className="cat-card-purple">
          <img src="/images/suits-category.png" alt="Suits" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">DESIGNER FAVORITES</span>
            <h3 className="cat-title-purple font-serif">Suits</h3>
            <p className="cat-desc-purple">Regal elegance for every precious occasion.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Tops */}
        <Link to="/shop?category=Tops" className="cat-card-purple">
          <img src="/images/indowestern-category.png" alt="Tops & Tunics" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">CASUAL CHIC</span>
            <h3 className="cat-title-purple font-serif">Tops</h3>
            <p className="cat-desc-purple">Charming everyday comfort in breathable cotton.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Three Piece Tops */}
        <Link to="/shop?category=Three%20Piece%20Tops" className="cat-card-purple">
          <img src="/images/three-piece-tops-category.png" alt="Three Piece Tops" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">LUXURY LAYERS</span>
            <h3 className="cat-title-purple font-serif">Three Piece Tops</h3>
            <p className="cat-desc-purple">Sophisticated three-piece cotton tunic ensembles.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Categories;
