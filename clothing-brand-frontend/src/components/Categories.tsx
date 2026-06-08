import { Link } from 'react-router-dom';
import './Categories.css';

interface CategoriesProps {
  products?: any[];
}

const Categories = ({ products = [] }: CategoriesProps) => {
  const getCategoryImage = (categoryName: string, defaultImg: string) => {
    const list = Array.isArray(products) ? products : [];
    const matched = list.find((p) => p.category === categoryName);
    return matched ? matched.image : defaultImg;
  };

  return (
    <section className="section categories-masonry-section" style={{padding: '0'}}>
      <div className="categories-masonry-dual">
        
        {/* Kurta Sets */}
        <Link to="/shop?category=Kurta%20Sets" className="cat-card-purple reveal-on-scroll">
          <img src={getCategoryImage('Kurta Sets', '/images/kurta-category.png')} alt="Kurta Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">THE ETHNIC EDIT</span>
            <h3 className="cat-title-purple font-serif">Kurta Sets</h3>
            <p className="cat-desc-purple">Timeless craftsmanship meets modern silhouettes.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Suits */}
        <Link to="/shop?category=Suits" className="cat-card-purple reveal-on-scroll delay-100">
          <img src={getCategoryImage('Suits', '/images/suits-category.png')} alt="Suits" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">DESIGNER FAVORITES</span>
            <h3 className="cat-title-purple font-serif">Suits</h3>
            <p className="cat-desc-purple">Regal elegance for every precious occasion.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Tops */}
        <Link to="/shop?category=Tops" className="cat-card-purple reveal-on-scroll delay-200">
          <img src={getCategoryImage('Tops', '/images/indowestern-category.png')} alt="Tops & Tunics" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">CASUAL CHIC</span>
            <h3 className="cat-title-purple font-serif">Tops</h3>
            <p className="cat-desc-purple">Charming everyday comfort in breathable cotton.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Three Piece Tops */}
        <Link to="/shop?category=Three%20Piece%20Tops" className="cat-card-purple reveal-on-scroll delay-300">
          <img src={getCategoryImage('Three Piece Tops', '/images/three-piece-tops-category.png')} alt="Three Piece Tops" className="cat-bg-img" />
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
