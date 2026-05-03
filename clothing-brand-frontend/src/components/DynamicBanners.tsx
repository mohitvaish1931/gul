import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Zap, Sparkles, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DynamicBanners = () => {
  const { state } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = state.banners || [];

  useEffect(() => {
    if (banners.length > 1 && isVisible) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners.length, isVisible]);

  if (!isVisible || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const getBannerStyles = (type?: string) => {
    switch (type) {
      case 'hot': return 'bg-primary-purple text-white';
      case 'new': return 'bg-gold-primary text-luxury-dark';
      case 'sold-out': return 'bg-gray-800 text-white';
      case 'info':
      default: return 'bg-luxury-dark text-text-primary border-b border-gold-primary/20';
    }
  };

  const getBannerIcon = (type?: string) => {
    switch (type) {
      case 'hot': return <Zap className="w-4 h-4" />;
      case 'new': return <Sparkles className="w-4 h-4" />;
      case 'sold-out': return <AlertCircle className="w-4 h-4" />;
      case 'info':
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className={`relative w-full transition-all duration-500 overflow-hidden ${getBannerStyles(currentBanner.type)} shadow-md z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left spacing for centering */}
        <div className="w-8"></div>
        
        {/* Content */}
        <div className="flex-1 flex items-center justify-center space-x-3 text-center px-4 animate-fade-in" key={currentBanner.id || currentIndex}>
          {getBannerIcon(currentBanner.type)}
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase truncate max-w-[80vw]">
            {currentBanner.text}
          </span>
          {getBannerIcon(currentBanner.type)}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          {banners.length > 1 && (
            <div className="hidden sm:flex items-center space-x-1 mr-4">
              <button onClick={() => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-bold tracking-widest opacity-70">
                {currentIndex + 1}/{banners.length}
              </span>
              <button onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicBanners;
