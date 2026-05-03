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
    name: 'CHERISH EARRING',
    price: 799,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'earrings',
    description: 'The Cherish Earrings are a perfect blend of elegance and sophistication. Crafted with precision and attention to detail, these earrings feature a timeless design that complements any outfit. Whether you\'re dressing up for a special occasion or adding a touch of glamour to your everyday look, the Cherish Earrings are the perfect choice.',
    features: [
      'Hypoallergenic materials',
      'Lightweight design for all-day comfort',
      'Secure butterfly backing',
      'Tarnish-resistant finish',
      'Gift-ready packaging'
    ],
    materials: ['Sterling Silver', '18K Gold Plating', 'Cubic Zirconia'],
    dimensions: '2.5cm x 1.2cm',
    weight: '3.2g per pair',
    careInstructions: [
      'Store in a dry place away from moisture',
      'Clean with a soft cloth after each use',
      'Avoid contact with perfumes and lotions',
      'Remove before swimming or showering'
    ]
  },
  {
    id: 2,
    name: 'SERENITY KADA',
    price: 999,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2697598/pexels-photo-2697598.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8891773/pexels-photo-8891773.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'bracelets',
    description: 'The Serenity Kada embodies tranquility and grace. This beautifully crafted bracelet features a smooth, polished finish that catches the light beautifully. Its comfortable fit and timeless design make it perfect for both casual and formal occasions.',
    features: [
      'Smooth polished finish',
      'Comfortable fit',
      'Durable construction',
      'Adjustable sizing',
      'Elegant gift box included'
    ],
    materials: ['Brass', '18K Gold Plating', 'Anti-tarnish coating'],
    dimensions: 'Inner diameter: 6.5cm, Width: 8mm',
    weight: '25g',
    careInstructions: [
      'Wipe clean with a soft, dry cloth',
      'Store separately to prevent scratching',
      'Avoid exposure to chemicals',
      'Polish occasionally with jewelry cloth'
    ]
  },
  {
    id: 3,
    name: 'DUO LOVE EARRING',
    price: 999,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10984235/pexels-photo-10984235.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'earrings',
    description: 'The Duo Love Earrings celebrate the beauty of connection and harmony. Featuring a unique dual-element design, these earrings symbolize love and unity. Perfect for romantic occasions or as a meaningful gift for someone special.',
    features: [
      'Unique dual-element design',
      'Symbolic love motif',
      'Comfortable post backing',
      'Nickel-free materials',
      'Romantic gift packaging'
    ],
    materials: ['Sterling Silver', 'Rose Gold Plating', 'Crystal accents'],
    dimensions: '1.8cm x 1.5cm',
    weight: '2.8g per pair',
    careInstructions: [
      'Clean gently with jewelry cleaner',
      'Store in provided pouch',
      'Avoid harsh chemicals',
      'Handle with care to preserve finish'
    ]
  },
  {
    id: 4,
    name: 'ETERNA DUO KADA',
    price: 899,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2697598/pexels-photo-2697598.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'bracelets',
    description: 'The Eterna Duo Kada represents eternal beauty and timeless style. This sophisticated bracelet features a dual-tone design that adds depth and visual interest. Its versatile style makes it perfect for layering or wearing alone.',
    features: [
      'Dual-tone design',
      'Versatile styling options',
      'Comfortable wear',
      'Scratch-resistant surface',
      'Premium gift presentation'
    ],
    materials: ['Stainless Steel', 'Gold Plating', 'Silver Accents'],
    dimensions: 'Inner diameter: 6.2cm, Width: 10mm',
    weight: '28g',
    careInstructions: [
      'Clean with mild soap and water',
      'Dry thoroughly after cleaning',
      'Store in jewelry box',
      'Avoid abrasive materials'
    ]
  },
  {
    id: 5,
    name: 'ECHO DROP EARRING',
    price: 999,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10984235/pexels-photo-10984235.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'earrings',
    description: 'The Echo Drop Earrings create a beautiful cascade of light and movement. These elegant drop earrings feature a graceful design that sways gently with your movements, creating an enchanting echo of sparkle and shine.',
    features: [
      'Graceful drop design',
      'Movement-responsive sparkle',
      'Secure hook closure',
      'Lightweight construction',
      'Elegant presentation box'
    ],
    materials: ['Sterling Silver', 'Cubic Zirconia', 'Rhodium Plating'],
    dimensions: '3.2cm x 0.8cm',
    weight: '4.1g per pair',
    careInstructions: [
      'Store hanging to prevent tangling',
      'Clean with jewelry polishing cloth',
      'Avoid contact with cosmetics',
      'Handle hooks gently'
    ]
  },
  {
    id: 6,
    name: 'CLASSIC SNAKE NECKLACE',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/12524644/pexels-photo-12524644.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8891773/pexels-photo-8891773.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2697598/pexels-photo-2697598.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'necklaces',
    description: 'The Classic Snake Necklace is a timeless piece that embodies sophistication and elegance. Its fluid snake chain design creates a beautiful drape around the neck, making it perfect for both casual and formal occasions.',
    features: [
      'Fluid snake chain design',
      'Adjustable length',
      'Secure lobster clasp',
      'Flexible and comfortable',
      'Luxury gift packaging'
    ],
    materials: ['Sterling Silver', '18K Gold Vermeil', 'Anti-tarnish coating'],
    dimensions: 'Length: 45cm (adjustable to 50cm)',
    weight: '15g',
    careInstructions: [
      'Store flat or hanging',
      'Clean with silver polishing cloth',
      'Avoid pulling or stretching',
      'Keep away from moisture'
    ]
  },
  {
    id: 7,
    name: 'AURORA EDGE EARRING',
    price: 599,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    soldOut: true,
    category: 'earrings',
    description: 'The Aurora Edge Earrings capture the ethereal beauty of the northern lights. With their unique edge design and iridescent finish, these earrings create a stunning play of light and color that changes with every angle.',
    features: [
      'Unique edge design',
      'Iridescent finish',
      'Color-changing effect',
      'Comfortable stud backing',
      'Limited edition design'
    ],
    materials: ['Titanium', 'Iridescent coating', 'Surgical steel posts'],
    dimensions: '1.5cm x 1.2cm',
    weight: '2.5g per pair',
    careInstructions: [
      'Clean with soft microfiber cloth',
      'Avoid harsh chemicals',
      'Store in protective case',
      'Handle gently to preserve coating'
    ]
  },
  {
    id: 8,
    name: 'BOLD BLOOM EARRING',
    price: 599,
    originalPrice: 1100,
    image: 'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1191536/pexels-photo-1191536.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10984235/pexels-photo-10984235.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/12524644/pexels-photo-12524644.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'earrings',
    description: 'The Bold Bloom Earrings are inspired by the beauty of blooming flowers. These statement earrings feature intricate petal details and a bold design that makes them perfect for special occasions and celebrations.',
    features: [
      'Floral-inspired design',
      'Intricate petal details',
      'Statement size',
      'Secure post backing',
      'Eye-catching appeal'
    ],
    materials: ['Brass', 'Gold Plating', 'Enamel details'],
    dimensions: '2.8cm x 2.5cm',
    weight: '5.2g per pair',
    careInstructions: [
      'Clean with damp cloth only',
      'Avoid soaking in water',
      'Store separately to prevent damage',
      'Handle with care due to delicate details'
    ]
  },
  {
    id: 9,
    name: 'NOVA KADA',
    price: 999,
    originalPrice: 1200,
    image: 'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1617067/pexels-photo-1617067.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8891773/pexels-photo-8891773.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'bracelets',
    description: 'The Nova Kada shines like a bright star in the night sky. This contemporary bracelet features a sleek design with subtle star-like engravings that catch the light beautifully, making it a perfect accessory for modern jewelry lovers.',
    features: [
      'Contemporary design',
      'Star-like engravings',
      'Light-catching surface',
      'Modern aesthetic',
      'Comfortable fit'
    ],
    materials: ['Stainless Steel', 'Rhodium Plating', 'Laser engravings'],
    dimensions: 'Inner diameter: 6.3cm, Width: 12mm',
    weight: '32g',
    careInstructions: [
      'Wipe with soft cloth after wear',
      'Use mild jewelry cleaner if needed',
      'Store in dry environment',
      'Avoid impact with hard surfaces'
    ]
  },
  {
    id: 10,
    name: 'ELEGANT CHAIN NECKLACE',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=400',
    images: [
      'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/2697598/pexels-photo-2697598.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/12524644/pexels-photo-12524644.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8891773/pexels-photo-8891773.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    sale: true,
    category: 'necklaces',
    description: 'The Elegant Chain Necklace is a versatile piece that complements any wardrobe. Its refined chain design and perfect length make it ideal for layering with other necklaces or wearing alone as a statement piece.',
    features: [
      'Versatile chain design',
      'Perfect for layering',
      'Refined appearance',
      'Durable construction',
      'Classic appeal'
    ],
    materials: ['Sterling Silver', 'Gold Fill', 'Polished finish'],
    dimensions: 'Length: 42cm',
    weight: '12g',
    careInstructions: [
      'Store in jewelry pouch',
      'Clean regularly with polishing cloth',
      'Avoid tangling with other jewelry',
      'Keep away from perfumes and lotions'
    ]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
