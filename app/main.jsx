import 'babel-polyfill';
import './stylesheets/main.scss';

import React from 'react';
import {render} from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';

import configureStore from './configure_store';
import App from './app.jsx';

const store = configureStore();

WebFont.load({
  google: {
        families: ['Roboto:300,400,500,700', 'Material Icons', 'Sacramento'],
    },
});

render((
    <Provider store={store}>
       <App/>
    </Provider>
), document.getElementById('app'));

