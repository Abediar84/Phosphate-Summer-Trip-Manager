import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/config';  // Import i18n configuration before App
import App from './App.tsx';
import './index.css';
import { Toast } from './components/ui/Toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toast />
  </StrictMode>
);