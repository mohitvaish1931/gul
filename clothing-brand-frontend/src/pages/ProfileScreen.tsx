import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { API_ENDPOINTS } from '../utils/api';
import { User, Package, Settings, LogOut, ShoppingBag } from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const logoutHandler = async () => {
    try {
      await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-page" style={{ backgroundColor: '#FDFBFD', minHeight: '100vh', padding: '100px 20px' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Profile Header */}
        <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', gap: '30px' }}>
           <div style={{ 
             width: '100px', 
             height: '100px', 
             backgroundColor: '#2D0A4E', 
             color: '#D4AF37', 
             borderRadius: '50%', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             fontSize: '2.5rem',
             fontWeight: '800',
             fontFamily: 'serif',
             boxShadow: '0 15px 30px rgba(45,10,78,0.1)'
           }}>
             {user.name.charAt(0).toUpperCase()}
           </div>
           <div>
             <span style={{ color: '#D4AF37', letterSpacing: '4px', fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>ROYAL PATRON</span>
             <h1 className="font-serif" style={{ fontSize: '2.8rem', color: '#2D0A4E' }}>Welcome, {user.name}</h1>
           </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '40px' }}>
          {/* Sidebar Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #f0f0f0', boxShadow: '0 15px 40px rgba(0,0,0,0.02)' }}>
              <h3 className="font-serif" style={{ fontSize: '1.5rem', color: '#2D0A4E', marginBottom: '25px', borderBottom: '1px solid #f8f8f8', paddingBottom: '15px' }}>Account Essence</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#999', letterSpacing: '2px', textTransform: 'uppercase' }}>REGISTERED NAME</span>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginTop: '5px' }}>{user.name}</p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#999', letterSpacing: '2px', textTransform: 'uppercase' }}>EMAIL IDENTITY</span>
                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginTop: '5px' }}>{user.email}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 <button style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '12px', 
                   padding: '15px 20px', 
                   borderRadius: '12px', 
                   backgroundColor: '#F8F5FF', 
                   color: '#2D0A4E', 
                   border: 'none', 
                   fontWeight: '800', 
                   fontSize: '0.85rem',
                   cursor: 'pointer'
                 }}>
                   <Settings size={18} /> UPDATE PROFILE
                 </button>
                 <button 
                   onClick={logoutHandler}
                   style={{ 
                     display: 'flex', 
                     alignItems: 'center', 
                     gap: '12px', 
                     padding: '15px 20px', 
                     borderRadius: '12px', 
                     backgroundColor: 'transparent', 
                     color: '#C53030', 
                     border: '1.5px solid #FED7D7', 
                     fontWeight: '800', 
                     fontSize: '0.85rem',
                     cursor: 'pointer'
                   }}
                 >
                   <LogOut size={18} /> DISCONNECT SESSION
                 </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
             <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '24px', border: '1px solid #f0f0f0', textAlign: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.02)' }}>
                <div style={{ color: '#D4AF37', marginBottom: '25px' }}>
                   <Package size={60} strokeWidth={1} />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.8rem', color: '#2D0A4E', marginBottom: '15px' }}>Your Collection Journey</h3>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '35px', maxWidth: '400px', margin: '0 auto 35px' }}>
                   It seems your wardrobe is awaiting its first Gul Fashion masterpiece. Our latest collection of handcrafted ethnic wear is ready for discovery.
                </p>
                <Link to="/shop" style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  backgroundColor: '#2D0A4E', 
                  color: '#fff', 
                  padding: '18px 40px', 
                  borderRadius: '12px', 
                  textDecoration: 'none', 
                  fontWeight: '800', 
                  letterSpacing: '2px',
                  boxShadow: '0 10px 30px rgba(45,10,78,0.1)'
                }}>
                   <ShoppingBag size={20} /> COMMENCE SHOPPING
                </Link>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .profile-page {
            padding: 60px 20px !important;
          }
          .profile-page > div > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          .profile-page h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileScreen;
