// Vite Performance Optimization Configuration
// This file documents all performance improvements made to boost PageSpeed score

const performanceConfig = {
  // Image Optimization
  images: {
    // All Cloudinary URLs use:
    // c_scale,w_<responsive>,q_auto,f_auto
    // This ensures:
    // - Automatic format conversion (WebP for modern browsers)
    // - Quality auto-optimization
    // - Width scaling based on viewport
    cloudinaryTransforms: 'c_scale,q_auto,f_auto'
  },

  // Bundle Optimization
  bundle: {
    // Minification: terser with console drop
    minify: 'terser',
    
    // Code Splitting Strategy:
    // - vendor: react, react-dom, react-router-dom (shared libs)
    // - icons: lucide-react (separate icon bundle)
    // - pages: lazy-loaded per route
    manualChunks: {
      'vendor': ['react', 'react-dom', 'react-router-dom'],
      'icons': ['lucide-react']
    }
  },

  // CSS Optimization
  css: {
    // Tailwind is PurgeCSS enabled
    // Only used styles are bundled
    // Critical CSS is inlined in HTML
  },

  // Network Optimization
  network: {
    // Resource Hints:
    // 1. preconnect: DNS + TCP + TLS for critical domains
    // 2. dns-prefetch: DNS only for secondary domains
    // 3. preload: Critical assets (hero image, fonts)
    // 4. prefetch: Prefetch products API to hide backend latency
    
    criticalDomains: [
      'https://gul-275k.onrender.com',  // API
      'https://res.cloudinary.com'       // Images
    ],

    // Early API prefetch to eliminate waterfall delay
    prefetchAPI: true
  },

  // HTML Optimization
  html: {
    // Inline critical CSS for hero section
    // Static shell HTML for instant FCP/LCP
    // Preload hero image with highest fetchpriority
    criticalInlined: true,
    staticShell: true
  },

  // Performance Metrics Target (after optimizations):
  // FCP: < 1.8s (currently 3.2s)
  // LCP: < 2.5s (currently 5.5s)
  // Speed Index: < 3.7s (currently 5.5s)
  // CLS: 0.082 ✓ (good)
  // TBT: 90ms ✓ (good)
  
  // Improvements Made:
  improvements: [
    '✓ Vite build optimization with terser minification',
    '✓ Code splitting: vendor + icons + lazy routes',
    '✓ Critical CSS inlined in HTML head',
    '✓ Static shell for instant FCP',
    '✓ Hero image preload with fetchpriority=high',
    '✓ Early API prefetch to hide backend latency',
    '✓ Resource hints: preconnect + dns-prefetch',
    '✓ Font loading with media=print + onload swap',
    '✓ Asset filename versioning for caching',
    '✓ Cloudinary transforms: auto-format + auto-quality',
    '✓ Console logs removed in production',
    '✓ Lazy loading for non-critical routes'
  ]
};

export default performanceConfig;
