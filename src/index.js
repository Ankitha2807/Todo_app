import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode helps catch bugs by running effects twice in development
  // It has NO effect in production builds
  <React.StrictMode>
    <App />
  </React.StrictMode>
);