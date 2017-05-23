import { ADD_COMMAND } from '../actions/console_actions';

const initialState = [];

const consoleReducer = (previousState = initialState, action) => {
  switch (action.type) {
    case ADD_COMMAND:
      return [...previousState, action.command];
    default:
      return previousState
  }
};

export default consoleReducer;
