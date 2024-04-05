import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ContextStoreProvider from './components/context/contextStore.jsx';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ContextStoreProvider>
          <App />
        </ContextStoreProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
