/**
 * SEO Configuration - Global constants and settings
 * Update these values to match your site's information
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: 'GUL FASHION',
  siteUrl: 'https://GUL FASHIONjewles.com',
  siteDescription: 'Premium luxury jewelry collection with exquisite earrings, necklaces, bracelets and more',
  siteLogo: 'https://GUL FASHIONjewles.com/logo.png',
  
  // Business Information
  business: {
    name: 'GUL FASHION',
    type: 'LocalBusiness',
    description: 'Premium Luxury Jewelry Retailer',
    priceRange: '₹₹₹',
    areaServed: 'IN',
    email: 'GUL FASHIONjewel@gmail.com',
    phone: '+91 78779 37350',
    address: {
      streetAddress: 'Pahadiya chowk',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302002',
      addressCountry: 'IN'
    }
  },

  // Social Media
  socialProfiles: {
    facebook: 'https://www.facebook.com/GUL FASHIONjewles',
    instagram: 'https://www.instagram.com/GUL FASHIONjewles',
    twitter: 'https://twitter.com/GUL FASHIONjewles',
    linkedin: 'https://www.linkedin.com/company/GUL FASHION-jewels',
    youtube: 'https://www.youtube.com/channel/GUL FASHIONjewles'
  },

  // Default Meta Information
  defaultMeta: {
    title: 'GUL FASHION - Premium Luxury Jewelry Collection | Earrings, Necklaces & Bracelets',
    description: 'Shop GUL FASHION\' exquisite luxury jewelry collection. Premium earrings, necklaces, bracelets & more. Timeless elegance with finest craftsmanship. Explore our 100% authentic collection now.',
    keywords: 'luxury jewelry, premium earrings, necklaces, bracelets, fine jewelry, designer jewelry, luxury accessories, authentic jewelry, jewelry collection'
  },

  // Page-Specific Meta
  pages: {
    home: {
      title: 'GUL FASHION - Premium Luxury Jewelry Collection | Shop Now',
      description: 'Discover GUL FASHION\' exquisite luxury jewelry collection. Premium earrings, necklaces, bracelets & more. Timeless elegance with finest craftsmanship. Shop 100% authentic jewelry today.',
      keywords: 'luxury jewelry, premium jewelry collection, earrings, necklaces, bracelets, luxury accessories, designer jewelry, fine jewelry, authentic jewelry'
    },
    products: {
      title: 'All Products - GUL FASHION Premium Jewelry Collection',
      description: 'Browse our complete collection of premium luxury jewelry. Find the perfect earrings, necklaces, bracelets and more from GUL FASHION.',
      keywords: 'all products, jewelry collection, earrings, necklaces, bracelets, luxury jewelry, premium accessories'
    },
    earrings: {
      title: 'Premium Earrings Collection - GUL FASHION Luxury Jewelry',
      description: 'Shop our exclusive collection of premium earrings. From elegant studs to stunning dangles, find the perfect earrings to elevate your style.',
      keywords: 'earrings, luxury earrings, premium earrings, designer earrings, jewelry earrings, gold earrings, diamond earrings'
    },
    bracelets: {
      title: 'Premium Bracelets Collection - GUL FASHION Luxury Jewelry',
      description: 'Discover our stunning collection of premium bracelets. Elegant designs crafted with finest materials for timeless sophistication.',
      keywords: 'bracelets, luxury bracelets, premium bracelets, designer bracelets, jewelry bracelets, gold bracelets, diamond bracelets'
    },
    necklaces: {
      title: 'Premium Necklaces Collection - GUL FASHION Luxury Jewelry',
      description: 'Browse our exquisite collection of premium necklaces. Find elegant designs with timeless appeal and finest craftsmanship.',
      keywords: 'necklaces, luxury necklaces, premium necklaces, designer necklaces, jewelry necklaces, gold necklaces, diamond necklaces'
    },
    contact: {
      title: 'Contact Us - GUL FASHION Premium Jewelry',
      description: 'Get in touch with GUL FASHION. We\'re here to help with your jewelry inquiries, orders, and customer service.',
      keywords: 'contact us, customer service, jewelry support, GUL FASHION contact'
    },
    trackOrder: {
      title: 'Track Your Order - GUL FASHION Jewelry Delivery Status',
      description: 'Track your GUL FASHION jewelry order in real-time. Get live updates on your shipment status, delivery date and package location.',
      keywords: 'track order, order tracking, jewelry delivery, shipment status, order status'
    },
    profile: {
      title: 'My Profile - GUL FASHION Jewelry',
      description: 'Manage your profile, view orders, cart and wishlist on GUL FASHION.',
      keywords: 'profile, orders, wishlist, cart, account management'
    }
  },

  // Robots & Crawling Rules
  robots: {
    index: 'index, follow',
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1
  },

  // OG Tags Defaults
  ogType: 'website',
  ogLocale: 'en_US',

  // Twitter Card Type
  twitterCardType: 'summary_large_image',

  // Verification Codes (Update with your actual codes)
  verification: {
    google: '498e7d065d63f257', // Added Google verification ID
    bing: '', // Add your Bing verification code
    pinterest: '', // Add your Pinterest verification code
  },

  // Sitemap Configuration
  sitemap: {
    homepage: {
      priority: 1.0,
      changefreq: 'weekly'
    },
    products: {
      priority: 0.9,
      changefreq: 'daily'
    },
    categories: {
      priority: 0.8,
      changefreq: 'weekly'
    },
    supportPages: {
      priority: 0.7,
      changefreq: 'monthly'
    }
  },

  // Analytics
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // Update with your GA4 ID
    googleSearchConsoleId: '498e7d065d63f257', // Added GSC property ID
  },

  // Canonical Base URL
  canonicalBase: 'https://GUL FASHIONjewles.com',

  // OpenSearch Description
  openSearchUrl: '/opensearch.xml',

  // PWA Configuration (if using PWA)
  pwa: {
    manifestUrl: '/manifest.json',
    themeColor: '#1a1a1a',
    backgroundColor: '#ffffff'
  }
};

/**
 * Helper function to get page-specific SEO metadata
 */
export const getPageSEO = (page: keyof typeof SEO_CONFIG.pages) => {
  return SEO_CONFIG.pages[page] || SEO_CONFIG.defaultMeta;
};

/**
 * Generate full URL for a page
 */
export const getPageUrl = (path: string) => {
  return `${SEO_CONFIG.canonicalBase}${path}`;
};

/**
 * Get social profile URL by platform
 */
export const getSocialUrl = (platform: keyof typeof SEO_CONFIG.socialProfiles) => {
  return SEO_CONFIG.socialProfiles[platform];
};

/**
 * Generate Business JSON-LD when needed
 */
export const getBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': SEO_CONFIG.business.type,
    name: SEO_CONFIG.business.name,
    description: SEO_CONFIG.business.description,
    url: SEO_CONFIG.siteUrl,
    email: SEO_CONFIG.business.email,
    ...(SEO_CONFIG.business.phone && { telephone: SEO_CONFIG.business.phone }),
    ...(SEO_CONFIG.business.address && {
      address: {
        '@type': 'PostalAddress',
        ...SEO_CONFIG.business.address
      }
    }),
    sameAs: Object.values(SEO_CONFIG.socialProfiles).filter(url => url),
    logo: SEO_CONFIG.siteLogo,
    image: SEO_CONFIG.siteLogo
  };
};
