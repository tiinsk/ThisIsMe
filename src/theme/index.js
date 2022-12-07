import {consoleColors, uiColors} from './colors';
import {variables} from './variables';

export const theme = {
  ...variables,
  UI: {
    colors: uiColors,
  },
  console: {
    colors: consoleColors,
  }
}
