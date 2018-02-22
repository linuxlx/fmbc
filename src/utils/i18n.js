// doc:
// https://react.i18next.com/getting-started.html
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// i18next plugin list:
// https://www.i18next.com/plugins-and-utils.html#plugins

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    lng: 'zh-cn',
    fallbackLng: 'zh-cn',
    debug: true,

    // have a common namespace used around the full app
    ns: ['common', 'types'],
    defaultNS: 'common',

    // xhr options: https://github.com/i18next/i18next-xhr-backend
    backend: {
      // by default: '/locales/{{lng}}/{{ns}}.json'
      // loadPath: `${process.env.PUBLIC_PATH || '/'}locales/{{lng}}/{{ns}}.json`,
      loadPath: `${process.env.PUBLIC_PATH || '/'}locales/zh-cn/{{ns}}.json`,
    },

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    react: {
      wait: false, // set to true if you like to wait for loaded in every translated hoc
      nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    },
  });


export default i18n;
