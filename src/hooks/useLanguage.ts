import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import {
  changeLanguage,
  getCurrentLanguageInfo,
  LANGUAGES,
} from '../i18n/config';

/**
 * Custom hook for language management
 */
export const useLanguage = () => {
  const {t, i18n} = useTranslation();

  const currentLanguage = getCurrentLanguageInfo();

  const switchLanguage = async (languageCode: string) => {
    const newLang = LANGUAGES.find(lang => lang.code === languageCode);

    if (!newLang) {
      console.warn(`Language ${languageCode} not supported`);
      return;
    }

    // Handle RTL languages (Arabic)
    const isRTL = newLang.rtl;
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    await changeLanguage(languageCode);
  };

  return {
    t,
    currentLanguage,
    availableLanguages: LANGUAGES,
    switchLanguage,
    isRTL: currentLanguage.rtl,
  };
};

