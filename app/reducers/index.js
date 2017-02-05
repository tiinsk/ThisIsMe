import { combineReducers } from 'redux';
import languageReducer from './language_reducer';

export default combineReducers({
  language: languageReducer
});
