import moment from 'moment';
import 'moment/locale/fi';
import { CHOOSE_LANGUAGE } from '../actions/language_actions';

const locale = localStorage.getItem('language') || 'en';
moment.locale(locale);

const initialState = {
  language: locale
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_LANGUAGE:
      localStorage.setItem('language', action.language);
      moment.locale(action.language);

      return Object.assign({}, state, {
        language: action.language
      });
    default:
      return state
  }
};

export default languageReducer;
