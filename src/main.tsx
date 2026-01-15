import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './rtk/store.tsx';
import ThemeWrapper from './components/ThemeWrapper';
import './locales'; // Initialize i18n
// @ts-ignore
import '@fontsource/poppins';

// Initialize document direction based on stored language
const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
const initialDirection = storedLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.dir = initialDirection;
document.documentElement.lang = storedLanguage;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>
);
