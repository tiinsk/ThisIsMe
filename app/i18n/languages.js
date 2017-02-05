import fi from './fi/fi.js';
import en from './en/en.js';

const languages = {
  fi,
  en
};

export const languageOptions = {
  fi: languages.fi.language,
  en: languages.en.language
};

export const getTranslations = (language) => {
  return languages[language] || languages.en;
};
