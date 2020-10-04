import { combineReducers } from 'redux';
import languageReducer from './language-reducer';
import consoleReducer from './console-reducer';

export default combineReducers({
  language: languageReducer,
  commands: consoleReducer
});
