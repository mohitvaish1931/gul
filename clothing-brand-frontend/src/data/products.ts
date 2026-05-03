export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  sale?: boolean;
  soldOut?: boolean;
  category: string;
  subcategory?: string;
  description: string;
  features: string[];
  materials: string[];
  dimensions?: string;
  weight?: string;
  careInstructions: string[];
  averageRating?: number;
  reviewCount?: number;
  colors?: string[];
  sizes?: string[];
  productLink?: string;
  status?: 'published' | 'pre-upload';
  displayOrder?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'ROYAL KANJIVARAM SAREE',
    price: 4999,
    originalPrice: 8500,
    image: 'https://images.pexels.com/photos/15761352/pexels-photo-15761352/free-photo-of-woman-in-traditional-saree.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/15761352/pexels-photo-15761352/free-photo-of-woman-in-traditional-saree.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/15761354/pexels-photo-15761354/free-photo-of-indian-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sale: true,
    category: 'Sarees',
    subcategory: 'Silk',
    description: 'Experience the grandeur of Jaipur with our hand-woven Royal Kanjivaram Silk Saree. Featuring intricate zari work and traditional motifs, this saree is a masterpiece of craftsmanship.',
    features: [
      'Pure Mulberry Silk',
      'Handcrafted Zari Borders',
      'Traditional Temple Motifs',
      'Unstitched Blouse Piece Included',
      'Authenticity Certified'
    ],
    materials: ['Pure Silk', 'Gold Zari Threads'],
    dimensions: 'Length: 5.5 meters + 0.8 meter blouse piece',
    weight: '800g',
    careInstructions: [
      'Dry Clean Only',
      'Store in a cotton saree bag',
      'Iron on low heat with a cloth cover',
      'Avoid direct sunlight'
    ],
    sizes: ['Free Size']
  },
  {
    id: 2,
    name: 'EMERALD CHANDERI SUIT',
    price: 3299,
    originalPrice: 5000,
    image: 'https://images.pexels.com/photos/15606484/pexels-photo-15606484/free-photo-of-woman-in-ethnic-outfit.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/15606484/pexels-photo-15606484/free-photo-of-woman-in-ethnic-outfit.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sale: true,
    category: 'Suits',
    subcategory: 'Anarkali',
    description: 'Elegant Emerald Chanderi Silk Suit set with heavy embroidery on the neck and sleeves. Comes with a matching dupatta and palazzo pants.',
    features: [
      'Premium Chanderi Silk',
      'Hand Embroidery',
      'Breathable Cotton Lining',
      'Full Flare Anarkali Style'
    ],
    materials: ['Chanderi Silk', 'Cotton Lining'],
    dimensions: 'Anarkali Length: 48 inches',
    weight: '600g',
    careInstructions: [
      'Dry Clean Recommended',
      'Hand wash separately in cold water',
      'Iron on reverse'
    ],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'BANDHANI PRINT KURTA SET',
    price: 2499,
    originalPrice: 3500,
    image: 'https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1446161/pexels-photo-1446161.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    sale: false,
    category: 'Kurta Sets',
    subcategory: 'Straight Cut',
    description: 'Traditional Bandhani Print Kurta Set in vibrant red. Perfect for casual gatherings and festive occasions.',
    features: [
      '100% Pure Cotton',
      'Traditional Bandhani Print',
      'Comfortable Regular Fit',
      'Matching Pants'
    ],
    materials: ['Pure Cotton'],
    dimensions: 'Kurta Length: 44 inches',
    weight: '400g',
    careInstructions: [
      'Machine wash cold',
      'Tumble dry low',
      'Warm iron'
    ],
    sizes: ['M', 'L', 'XL', 'XXL']
  }
];
