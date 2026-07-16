import { Link } from 'react-router-dom';
import './CircleCategories.css';

interface CircleCategoriesProps {
  products?: any[];
}

const CircleCategories = ({ products = [] }: CircleCategoriesProps) => {
  const categoriesList = [
    {
      name: 'Kurta Sets',
      path: '/shop?category=Kurta%20Sets',
      label: 'Kurta Sets',
      defaultImg: '/images/kurta-category.png'
    },
    {
      name: 'Suit Sets',
      path: '/shop?category=Suit%20Sets',
      label: 'Suit Sets',
      defaultImg: '/images/suits-category.png'
    },
    {
      name: 'Shrug Sets',
      path: '/shop?category=Shrug%20Sets',
      label: 'Shrug Sets',
      defaultImg: '/images/three-piece-tops-category.png'
    },
    {
      name: 'Tops & Co-ord Sets',
      path: '/shop?category=Tops%20%26%20Co-ord%20Sets',
      label: 'Co-ord Sets',
      defaultImg: '/images/indowestern-category.png'
    },
    {
      name: 'Maxis & Dresses',
      path: '/shop?category=Maxis%20%26%20Dresses',
      label: 'Maxis & Dresses',
      defaultImg: '/images/bridal-edit.png'
    }
  ];

  const getCategoryImage = (categoryName: string, defaultImg: string) => {
    const list = Array.isArray(products) ? products : [];
    const matched = list.find((p) => p.category === categoryName);
    return matched ? matched.image : defaultImg;
  };

  return (
    <div className="circle-categories-wrapper">
      <div className="circle-categories-container scroll-hidden">
        {categoriesList.map((cat, index) => {
          const list = Array.isArray(products) ? products : [];
          const matched = list.find((p) => p.category === cat.name);
          if (!matched) return null; // Only show category if a product exists
          const imgSrc = matched.image;
          
          return (
            <Link to={cat.path} key={index} className="circle-category-item">
              <div className="circle-image-ring">
                <div className="circle-image-inner">
                  <img src={imgSrc} alt={cat.label} />
                </div>
              </div>
              <span className="circle-category-label">{cat.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CircleCategories;
