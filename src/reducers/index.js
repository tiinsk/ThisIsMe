import { combineReducers } from 'redux';
import consoleReducer from './console-reducer';

export default combineReducers({
  commands: consoleReducer
});
