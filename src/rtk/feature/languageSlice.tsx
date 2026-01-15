import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Language = 'en' | 'ar';

interface LanguageState {
  currentLanguage: Language;
  direction: 'ltr' | 'rtl';
}

// Get initial language from localStorage or default to 'en'
const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem('i18nextLng');
  if (stored === 'ar' || stored === 'en') {
    return stored;
  }
  return 'en';
};

const initialState: LanguageState = {
  currentLanguage: getInitialLanguage(),
  direction: getInitialLanguage() === 'ar' ? 'rtl' : 'ltr',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
      // Update localStorage
      localStorage.setItem('i18nextLng', action.payload);
      // Update document direction
      document.documentElement.dir = state.direction;
      document.documentElement.lang = action.payload;
    },
    toggleLanguage: (state) => {
      const newLanguage = state.currentLanguage === 'en' ? 'ar' : 'en';
      state.currentLanguage = newLanguage;
      state.direction = newLanguage === 'ar' ? 'rtl' : 'ltr';
      // Update localStorage
      localStorage.setItem('i18nextLng', newLanguage);
      // Update document direction
      document.documentElement.dir = state.direction;
      document.documentElement.lang = newLanguage;
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice;
