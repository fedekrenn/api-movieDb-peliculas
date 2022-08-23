import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoguinProvider } from './context/loguinContext';
import { FavoriteProvider } from './context/favoriteContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoriteProvider>
      <LoguinProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoguinProvider>
    </FavoriteProvider>
  </React.StrictMode >
);

