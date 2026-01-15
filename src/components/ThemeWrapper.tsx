import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../rtk/store';
import createAppTheme from '../theme';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { i18n } = useTranslation();
  const direction = useSelector((state: RootState) => state.language.direction);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  useEffect(() => {
    // Initialize i18n language from Redux state on mount
    const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
    if (i18n.language !== storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []); // Only run on mount

  useEffect(() => {
    // Sync i18n when Redux language changes
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [direction, currentLanguage]);

  const theme = createAppTheme(direction);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
