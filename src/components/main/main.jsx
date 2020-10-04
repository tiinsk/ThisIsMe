import '../../../node_modules/animate.css/animate.min.css';

import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import configureStore from '../../configure-store';
import {
  GlobalStyle,
  theme,
} from '../../theme';
import routes from './routes';

const store = configureStore();

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        {routes(store)}
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

