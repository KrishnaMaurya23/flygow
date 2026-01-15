import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../rtk/feature/languageSlice';
import type { RootState } from '../../rtk/store';
import type { Language } from '../../rtk/feature/languageSlice';

interface LanguageMenuProps {
  onClose?: () => void;
}

export default function LanguageMenu({ onClose }: LanguageMenuProps) {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleLanguageChange = (lang: Language) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <MenuItem
        onClick={() => handleLanguageChange('en')}
        selected={currentLanguage === 'en'}
        sx={{
          fontSize: '14px',
          fontWeight: currentLanguage === 'en' ? 600 : 400,
          color: currentLanguage === 'en' ? '#0E6A37' : '#384250',
        }}
      >
        <ListItemText>English</ListItemText>
        {currentLanguage === 'en' && (
          <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
            ✓
          </ListItemIcon>
        )}
      </MenuItem>
      <MenuItem
        onClick={() => handleLanguageChange('ar')}
        selected={currentLanguage === 'ar'}
        sx={{
          fontSize: '14px',
          fontWeight: currentLanguage === 'ar' ? 600 : 400,
          color: currentLanguage === 'ar' ? '#0E6A37' : '#384250',
        }}
      >
        <ListItemText>العربية</ListItemText>
        {currentLanguage === 'ar' && (
          <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
            ✓
          </ListItemIcon>
        )}
      </MenuItem>
    </>
  );
}
