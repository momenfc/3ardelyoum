import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import ar from './locales/ar.json';

const isRTL = true;
I18nManager.allowRTL(true);
I18nManager.forceRTL(isRTL);

void i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar } },
  lng: 'ar',
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
});

export default i18n;
