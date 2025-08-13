import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import koTranslation from './locales/ko/translation.json';
import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';
import zhTranslation from './locales/zh/translation.json';
import itTranslation from './locales/it/translation.json';

const resources = {
  ko: {
    translation: koTranslation
  },
  en: {
    translation: enTranslation
  },
  ja: {
    translation: jaTranslation
  },
  zh: {
    translation: zhTranslation
  },
  it: {
    translation: itTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },
  });

export default i18n;