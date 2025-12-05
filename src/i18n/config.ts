import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language files
const tr = require('./locales/tr.json');
const en = require('./locales/en.json');
const de = require('./locales/de.json');
const ar = require('./locales/ar.json');
const es = require('./locales/es.json');
const ru = require('./locales/ru.json');
const fr = require('./locales/fr.json');

const LANGUAGE_STORAGE_KEY = '@komsu_agi_language';

// Language resources
const resources = {
  tr: {translation: tr},
  en: {translation: en},
  de: {translation: de},
  ar: {translation: ar},
  es: {translation: es},
  ru: {translation: ru},
  fr: {translation: fr},
};

// Supported languages
export const LANGUAGES = [
  {code: 'tr', name: 'Türkçe', flag: '🇹🇷', rtl: false},
  {code: 'en', name: 'English', flag: '🇬🇧', rtl: false},
  {code: 'de', name: 'Deutsch', flag: '🇩🇪', rtl: false},
  {code: 'ar', name: 'العربية', flag: '🇦🇪', rtl: true},
  {code: 'es', name: 'Español', flag: '🇪🇸', rtl: false},
  {code: 'ru', name: 'Русский', flag: '🇷🇺', rtl: false},
  {code: 'fr', name: 'Français', flag: '🇫🇷', rtl: false},
];

// Get device language or default to Turkish
const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales && locales.length > 0) {
    const deviceLang = locales[0].languageCode;
    const supportedLang = LANGUAGES.find(lang => lang.code === deviceLang);
    return supportedLang ? deviceLang : 'tr';
  }
  return 'tr';
};

// Get saved language from storage
const getSavedLanguage = async (): Promise<string> => {
  try {
    const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLang || getDeviceLanguage();
  } catch (error) {
    console.error('Error loading saved language:', error);
    return getDeviceLanguage();
  }
};

// Save language to storage
export const saveLanguage = async (languageCode: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Initialize i18n
export const initI18n = async (): Promise<void> => {
  const savedLang = await getSavedLanguage();

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLang,
    fallbackLng: 'tr',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

// Change language and save preference
export const changeLanguage = async (languageCode: string): Promise<void> => {
  await i18n.changeLanguage(languageCode);
  await saveLanguage(languageCode);
};

// Get current language info
export const getCurrentLanguageInfo = () => {
  const currentLang = i18n.language;
  return LANGUAGES.find(lang => lang.code === currentLang) || LANGUAGES[0];
};

export default i18n;

