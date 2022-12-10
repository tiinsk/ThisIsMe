import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware, thunkMiddleware));
}
