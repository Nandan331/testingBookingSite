import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/Authentication.js';
import CheckDates from './context/CheckDates.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CheckDates>
      <App />
      </CheckDates>
    </AuthProvider>
  </React.StrictMode>
);
