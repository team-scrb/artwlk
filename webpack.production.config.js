const Webpack = require('webpack');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'main.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  'css-loader',
  'autoprefixer-loader?browsers=last 2 version',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './app'),
];

const config = {
  // We change to normal source mapping, if you need them
  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [nodeModulesPath],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
};

module.exports = config;
