import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { isDev } from '../';

import en from './en';

i18n.use(initReactI18next).init({
  resources: {
    en,
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: isDev,

  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
  },
});

export default i18n;
