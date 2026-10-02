import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { API_BASE_URL, AUTH_EXPIRED_EVENT, getAuthToken } from './utils/api';

const requestUrl = (input: RequestInfo | URL) =>
  typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

// Global fetch interceptor: adds the login token to API calls and gives user-friendly network errors
const originalFetch = window.fetch;
window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
  if (!navigator.onLine) {
    return Promise.reject(new Error("No internet connection. Please check your network and try again."));
  }

  const url = requestUrl(input);
  const token = getAuthToken();
  let sentToken = false;
  if (token && url.startsWith(API_BASE_URL) && !url.includes('/api/users/login')) {
    const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
    if (!headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
      sentToken = true;
    }
    init = { ...init, headers };
  }

  try {
    const response = await originalFetch.call(this, input, init);
    if (sentToken && response.status === 401) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    return response;
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
