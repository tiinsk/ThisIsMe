import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/configure-store';

const store = configureStore();

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <div style={{ height: '100%', overflow: 'hidden' }}>{element}</div>
    </Provider>
  );
};
