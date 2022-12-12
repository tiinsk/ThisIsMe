import fi from './fi/fi.js';
import en from './en/en.js';

export const translations = {
  fi,
  en
};

export const languageOptions = {
  fi: translations.fi.language,
  en: translations.en.language
};

export const getTranslations = (language) => {
  return translations[language] || translations.en;
};
