const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

if (app.settings.env === 'development') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webConfig = require('./webpack.dev.config.js');
  const compiler = webpack(webConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: webConfig.output.publicPath,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000,
  }));
}

if (app.settings.env === 'production') {
  app.get('*.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  });
}


app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/*', (req, res) => {
  res.sendFile('/index.html', {
    root: __dirname
  });
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});


module.exports = app;
