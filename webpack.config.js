const Webpack = require('webpack');
const path = require('path');
const appPath = path.resolve(__dirname, 'app');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');

const config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    path.resolve(appPath, 'main.jsx')],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath],
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: [nodeModulesPath],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = config;
