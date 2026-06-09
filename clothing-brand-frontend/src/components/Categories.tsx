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

        {/* Suit Sets */}
        <Link to="/shop?category=Suit%20Sets" className="cat-card-purple reveal-on-scroll delay-100">
          <img src={getCategoryImage('Suit Sets', '/images/suits-category.png')} alt="Suit Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">DESIGNER FAVORITES</span>
            <h3 className="cat-title-purple font-serif">Suit Sets</h3>
            <p className="cat-desc-purple">Regal elegance for every precious occasion.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Tops & Co-ord Sets */}
        <Link to="/shop?category=Tops%20%26%20Co-ord%20Sets" className="cat-card-purple reveal-on-scroll delay-200">
          <img src={getCategoryImage('Tops & Co-ord Sets', '/images/indowestern-category.png')} alt="Tops & Co-ord Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">CASUAL CHIC</span>
            <h3 className="cat-title-purple font-serif">Tops & Co-ords</h3>
            <p className="cat-desc-purple">Charming everyday comfort in breathable cotton.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

        {/* Shrug Sets */}
        <Link to="/shop?category=Shrug%20Sets" className="cat-card-purple reveal-on-scroll delay-300">
          <img src={getCategoryImage('Shrug Sets', '/images/three-piece-tops-category.png')} alt="Shrug Sets" className="cat-bg-img" />
          <div className="cat-overlay-purple"></div>
          <div className="cat-text-content-purple">
            <span className="cat-tag-purple">LUXURY LAYERS</span>
            <h3 className="cat-title-purple font-serif">Shrug Sets</h3>
            <p className="cat-desc-purple">Sophisticated three-piece cotton tunic ensembles.</p>
            <span className="cat-link-purple">EXPLORE COLLECTION</span>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Categories;
