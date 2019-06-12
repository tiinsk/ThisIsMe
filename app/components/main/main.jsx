import 'babel-polyfill';
import '../../stylesheets/main.scss';

import React from 'react';
import {render} from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory } from 'react-router-dom';

import configureStore from '../../configure_store';
import routes from './routes';

const store = configureStore();

WebFont.load({
  google: {
        families: [
          "Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i",
          "Lato:100,100i,300,300i,400,400i,700,700i,900,900i",
          'Quicksand:300,400,500,700',
          'Space+Mono:400,400i,700,700i'
        ],
    },
});

if(__PRODUCTION__){
  ga('create', 'UA-54768362-3', 'auto');
  ga('send', 'pageview');
}

render((
    <Provider store={store}>
      <BrowserRouter>
        {routes(store)}
      </BrowserRouter>
    </Provider>
), document.getElementById('app'));

