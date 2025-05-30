import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from './translations/ro.json';
import en from './translations/en.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  ro: {
    translation: ro,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  });

export default i18n;
