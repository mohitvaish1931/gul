import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global fetch interceptor for user-friendly network errors
const originalFetch = window.fetch;
window.fetch = async function (...args) {
  if (!navigator.onLine) {
    return Promise.reject(new Error("No internet connection. Please check your network and try again."));
  }
  try {
    return await originalFetch.apply(this, args);
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error("Unable to connect to the server. Please check your internet connection.");
    }
    throw error;
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
