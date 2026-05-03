import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfileScreen from './pages/ProfileScreen';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from './context/AppContext';

import Admin from './pages/Admin';
import EditProduct from './pages/EditProduct';
import TrackOrder from './pages/TrackOrder';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

const MainLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container flex flex-col" style={{minHeight: '100vh', position: 'relative'}}>
      {!isAdmin && <Header />}
      <main style={{flex: 1}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/product/:id/edit" element={<EditProduct />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      
      {/* Floating WhatsApp Button */}
      {!isAdmin && (
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noreferrer"
          className="whatsapp-float"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#25D366',
            color: '#fff',
            width: '60px',
            height: '60px',
            borderRadius: '50px',
            textAlign: 'center',
            fontSize: '30px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Chat with Styling Concierge"
        >
          <svg viewBox="0 0 32 32" width="35" height="35" fill="currentColor">
            <path d="M16.05 1.13c-8.18 0-14.83 6.64-14.83 14.83 0 2.61.68 5.16 1.98 7.42L1.13 30.87l7.65-2.01c2.2.19 4.41.3 6.67.3 8.18 0 14.83-6.64 14.83-14.83 0-8.19-6.65-14.83-14.83-14.83zm0 27.28c-2.2 0-4.36-.59-6.25-1.7l-.45-.26-4.64 1.22 1.24-4.52-.29-.46c-1.22-1.92-1.87-4.15-1.87-6.43 0-6.84 5.57-12.41 12.41-12.41s12.41 5.57 12.41 12.41c-.01 6.84-5.58 12.41-12.41 12.41zm6.81-9.33c-.37-.19-2.21-1.09-2.55-1.22-.34-.12-.59-.19-.84.19-.25.37-.96 1.22-1.18 1.46-.22.25-.45.28-.82.09-.37-.19-1.58-.58-3.01-1.86-1.11-1-1.86-2.23-2.08-2.61-.22-.37-.02-.57.16-.76.16-.16.37-.43.56-.65.19-.22.25-.37.37-.62.12-.25.06-.46-.03-.65-.09-.19-.84-2.02-1.15-2.76-.3-.72-.61-.62-.84-.63-.22-.01-.46-.01-.71-.01s-.65.09-.99.46c-.34.37-1.3 1.27-1.3 3.11s1.33 3.61 1.52 3.86c.19.25 2.63 4.02 6.37 5.63.89.38 1.58.61 2.12.78.89.28 1.7.24 2.34.15.72-.1 2.21-.9 2.52-1.77.31-.87.31-1.61.22-1.77-.09-.16-.34-.25-.71-.44z"/>
          </svg>
        </a>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </AppProvider>
  );
}

export default App;
