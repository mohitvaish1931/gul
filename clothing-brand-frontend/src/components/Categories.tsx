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
        
        {(() => {
          const categoriesList = [
            {
              name: 'Kurta Sets',
              path: '/shop?category=Kurta%20Sets',
              tag: 'THE ETHNIC EDIT',
              title: 'Kurta Sets',
              desc: 'Timeless craftsmanship meets modern silhouettes.'
            },
            {
              name: 'Suit Sets',
              path: '/shop?category=Suit%20Sets',
              tag: 'DESIGNER FAVORITES',
              title: 'Suit Sets',
              desc: 'Regal elegance for every precious occasion.'
            },
            {
              name: 'Tops & Co-ord Sets',
              path: '/shop?category=Tops%20%26%20Co-ord%20Sets',
              tag: 'CASUAL CHIC',
              title: 'Tops & Co-ords',
              desc: 'Charming everyday comfort in breathable cotton.'
            },
            {
              name: 'Shrug Sets',
              path: '/shop?category=Shrug%20Sets',
              tag: 'LUXURY LAYERS',
              title: 'Shrug Sets',
              desc: 'Sophisticated three-piece cotton tunic ensembles.'
            }
          ];

          return categoriesList.map((cat, index) => {
            const list = Array.isArray(products) ? products : [];
            const matched = list.find((p) => p.category === cat.name);
            if (!matched) return null;
            
            return (
              <Link to={cat.path} key={index} className={`cat-card-purple reveal-on-scroll delay-${index * 100}`}>
                <img src={matched.image} alt={cat.name} className="cat-bg-img" />
                <div className="cat-overlay-purple"></div>
                <div className="cat-text-content-purple">
                  <span className="cat-tag-purple">{cat.tag}</span>
                  <h3 className="cat-title-purple font-serif">{cat.title}</h3>
                  <p className="cat-desc-purple">{cat.desc}</p>
                  <span className="cat-link-purple">EXPLORE COLLECTION</span>
                </div>
              </Link>
            );
          });
        })()}

      </div>
    </section>
  );
};

export default Categories;
