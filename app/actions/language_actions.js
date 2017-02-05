export const CHOOSE_LANGUAGE = 'CHOOSE_LANGUAGE';

export function chooseLanguage(language){
  return{
    type: CHOOSE_LANGUAGE,
    language
  }
}
