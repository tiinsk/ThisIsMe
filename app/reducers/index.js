import { combineReducers } from 'redux';
import languageReducer from './language_reducer';
import consoleReducer from './console_reducer';

export default combineReducers({
  language: languageReducer,
  commands: consoleReducer
});
