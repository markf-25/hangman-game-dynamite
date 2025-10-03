import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import en from "./locales/eng/translation.json"
import it from "./locales/ita/translation.json"

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it }
  },
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
