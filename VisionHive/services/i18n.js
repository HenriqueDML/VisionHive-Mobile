import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import pt from '../locales/pt.json';
import es from '../locales/es.json';

const resources = {
  'pt-BR': {
    translation: pt
  },
  'pt': {
    translation: pt
  },
  'es': {
    translation: es
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'pt',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;