import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// importação dos JSONs
import en from './locales/en.json'
import pt from './locales/pt.json'

i18n
  .use(LanguageDetector)       // detecta o idioma do navegador
  .use(initReactI18next)       // integra com React
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'en',         // idioma padrão se não achar
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,      // o React já escapa
    },
  })

export default i18n
