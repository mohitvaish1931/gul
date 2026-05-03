/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium Luxury Backgrounds (Medium Shade Theme)
        'luxury-dark': '#E8D5C4',        // Warm Champagne
        'luxury-secondary': '#DBCBC0',   // Soft Sandstone
        'luxury-tertiary': '#C9B7A2',    // Muted Taupe-Sand
        
        // Brand Accents
        'primary-red': '#8B0000',        // Deep Garnet Red
        'primary-nude': '#DBCBC0',
        'secondary-nude': '#E8D5C4',
        'accent-nude': '#DBCBC0',
        'gold-primary': '#C5A059',       // Antique Gold
        'accent-gold': '#C5A059',        // Alias
        'teal-luxury': '#8B0000',        // Alias for Red
        'emerald-luxury': '#C5A059',     // Alias
        'sapphire-luxury': '#C9B7A2',    // Alias
        'dark-chocolate': '#3D1F1F',      // Deep Burgundy-Brown
        
        // Premium Text Colors
        'text-primary': '#3D1F1F',       // Deep Dark Brown
        'text-secondary': '#5E4B43',     // Muted Chestnut
        'text-muted': '#8C7A72',         // Taupe-Gray
        'text-accent': '#C5A059',        // Gold accent text
        'rose-gold': '#B76E79',
        'platinum': '#E8D5C4',           // Light base
        
        // Glass & Overlay
        'glass-light': 'rgba(255, 255, 255, 0.6)',
        'glass-dark': 'rgba(61, 31, 31, 0.15)',
      },

      fontFamily: {
        'serif': ['Georgia', 'Garamond', 'serif'],
        'sans': ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px rgba(212, 175, 55, 0.35)',
        'glow-lg': '0 0 60px rgba(212, 175, 55, 0.25)',
        'glow-ruby': '0 0 40px rgba(139, 69, 87, 0.4)',
        'glow-emerald': '0 0 40px rgba(26, 107, 106, 0.4)',
        'glow-sapphire': '0 0 40px rgba(26, 107, 106, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
        'premium': '0 20px 50px rgba(45, 19, 32, 0.6), 0 0 40px rgba(212, 175, 55, 0.25)',
      },

      backdropFilter: {
        'glass': 'backdrop-filter blur(20px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(255, 215, 0, 0.8)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%': { backgroundPosition: '-200% center' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};