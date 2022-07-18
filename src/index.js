import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoriteProvider } from './context/favoriteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoriteProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavoriteProvider>
  </React.StrictMode >
);

