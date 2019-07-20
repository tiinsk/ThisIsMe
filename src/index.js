import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/main/main';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i',
      'Lato:100,100i,300,300i,400,400i,700,700i,900,900i',
      'Quicksand:300,400,500,700',
      'PT+Serif:700',
      'Source+Code+Pro:400',
      'Material+Icons',
    ],
  },
});
console.log(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
