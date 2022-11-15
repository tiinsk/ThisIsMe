import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';

import configureStore from './src/configure-store';
import {
  GlobalStyle,
  theme,
} from './src/theme';

const store = configureStore();

export const wrapRootElement = ({ element }) => {
  return (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <div style={{height: '100%', overflow: 'hidden'}}>
        {element}
      </div>
    </Provider>
  </ThemeProvider>
)}
