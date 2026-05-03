import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { API_ENDPOINTS } from '../utils/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Backend returns { token, id, name, email, isAdmin }
      dispatch({ 
        type: 'SET_USER', 
        payload: { 
          id: data.id || data._id, 
          email: data.email, 
          name: data.name, 
          isAdmin: data.isAdmin 
        } 
      });

      // Navigate based on role
      if (data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container page-top-padding flex justify-center items-center" style={{minHeight: '80vh'}}>
      <div style={{width: '100%', maxWidth: '400px', padding: '40px', background: '#fff', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
        <h1 className="font-serif text-center" style={{fontSize: '2rem', marginBottom: '10px', color: 'var(--primary-color)'}}>Sign In</h1>
        <p className="text-center" style={{color: '#666', marginBottom: '30px'}}>Access your GUL FASHION account</p>

        {error && (
          <div style={{ padding: '12px', background: '#fff5f5', border: '1px solid #feb2b2', color: '#c53030', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444'}}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '2px', outline: 'none'}}
            />
          </div>

          <div style={{marginBottom: '30px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#444'}}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '2px', outline: 'none'}}
            />
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            style={{padding: '14px'}}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center" style={{marginTop: '20px', fontSize: '0.9rem'}}>
          New Customer? <Link to="/register" style={{color: 'var(--primary-color)', fontWeight: '500'}}>Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
