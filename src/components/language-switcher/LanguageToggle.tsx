import { IconButton, Tooltip, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../rtk/feature/languageSlice';
import type { RootState } from '../../rtk/store';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleToggle = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  return (
    <Tooltip title={currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}>
      <IconButton
        onClick={handleToggle}
        sx={{
          color: '#384250',
          border: '1px solid #D2D6DB',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          '&:hover': {
            backgroundColor: '#F3F4F6',
            borderColor: '#9DA4AE',
          },
          minWidth: '48px',
          height: '36px',
        }}
      >
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            minWidth: '40px',
            textAlign: 'center',
          }}
        >
          {currentLanguage === 'en' ? 'AR' : 'EN'}
        </Box>
      </IconButton>
    </Tooltip>
  );
}
