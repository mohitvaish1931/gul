import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login and redirect to profile for demo
    navigate('/profile');
  };

  return (
    <div className="container page-top-padding flex justify-center items-center" style={{minHeight: '80vh'}}>
      <div style={{width: '100%', maxWidth: '400px', padding: '40px', background: '#fff', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
        <h1 className="font-serif text-center" style={{fontSize: '2rem', marginBottom: '10px', color: 'var(--primary-color)'}}>Sign In</h1>
        <p className="text-center" style={{color: '#666', marginBottom: '30px'}}>Access your GUL FASHION account</p>

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

          <button type="submit" className="btn btn-primary w-full" style={{padding: '14px'}}>
            Sign In
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
