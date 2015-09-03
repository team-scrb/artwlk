module.exports = function karmaConfig(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    files: [
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/es6-promise-polyfill/promise.js',
      'spec/SpecHelper.js',
      'spec/**/*Spec.js*',
    ],

    preprocessors: {
      'spec/**/*Spec.js*': ['webpack'],
    },

    webpack: require('./webpack.config.js'),
    webpackServer: { noInfo: true },
    singleRun: true,
  });
};
