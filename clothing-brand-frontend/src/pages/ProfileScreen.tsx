import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { API_ENDPOINTS } from '../utils/api';

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
    <div className="container page-top-padding" style={{padding: '50px 5%'}}>
      <h1 className="font-serif" style={{fontSize: '2.5rem', marginBottom: '30px', color: 'var(--primary-color)'}}>My Profile</h1>
      
      <div className="flex" style={{gap: '40px', flexWrap: 'wrap'}}>
        <div style={{flex: '1', minWidth: '300px', padding: '30px', background: '#fff', border: '1px solid #eee', borderRadius: '4px'}}>
          <h2 className="font-serif" style={{fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>Account Details</h2>
          <div style={{marginBottom: '20px'}}>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Name</p>
            <p style={{fontSize: '1.1rem'}}>{user.name}</p>
          </div>
          <div style={{marginBottom: '30px'}}>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Email Address</p>
            <p style={{fontSize: '1.1rem'}}>{user.email}</p>
          </div>
          
          <button className="btn btn-outline w-full" style={{marginBottom: '15px'}}>Update Profile</button>
          <button onClick={logoutHandler} className="btn w-full" style={{background: '#f8f8f8', border: '1px solid #ddd', color: '#333'}}>Log Out</button>
        </div>

        <div style={{flex: '2', minWidth: '300px'}}>
          <h2 className="font-serif" style={{fontSize: '1.5rem', marginBottom: '20px'}}>Order History</h2>
          
          <div style={{padding: '20px', background: '#fcfcfc', border: '1px solid #eee', borderRadius: '4px', textAlign: 'center'}}>
            <p style={{color: '#666', marginBottom: '15px'}}>You haven't placed any orders yet.</p>
            <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
