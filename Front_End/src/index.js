import React from 'react';
import ReactDOM from 'react-dom/client'; //specifically for client
import App from './App';
//bridge between React code and actual HTML page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);