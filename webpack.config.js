const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    app: './client/components/app.jsx',
  },
  output: {
    path: 'dist',
    filename: '[name].js',
    publicPath: 'http://localhost:8090/client/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/(node_modules|bower_components)/',
        loader: 'babel-loader?optional=runtime',
      },
      {
        test: /\.jsx$/,
        exclude: '/(node_modules|bower_components)/',
        loaders: [
          // 'react-hot',
          'babel-loader?optional=runtime',
        ],
      },
    ],
  },
  // externals: {
  //   'react': 'React',
  // },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [commonsPlugin],
};
