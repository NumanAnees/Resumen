import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common_es from "./locales/es/es.json";
import common_en from "./locales/en/en.json";
import common_fr from "./locales/fr/fr.json";
import common_ru from "./locales/ru/ru.json";
import common_se from "./locales/se/se.json";
import common_dk from "./locales/dk/dk.json";
import common_pt from "./locales/pt/pt.json";
import common_de from "./locales/de/de.json";
import Backend from 'i18next-http-backend';

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng:"en",
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        common: common_en               // 'common' is our custom namespace
      },
      es: {
        common: common_es
      },
      fr: {
        common: common_fr
      },
      ru: {
        common: common_ru
      },
      se: {
        common: common_se
      },
      dk: {
        common: common_dk
      },
      pt: {
        common: common_pt
      },
      de: {
        common: common_de
      },
    },
  });


export default i18n;