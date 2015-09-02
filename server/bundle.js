const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config.js');
const path = require('path');
const mainPath = path.resolve(__dirname, '..', 'app', 'main.jsx');

module.exports = () => {
  const bundleStart = null;
  const compiler = webpack(webpackConfig);
  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', () => {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  const bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    inline: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(3001, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
};
