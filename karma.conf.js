module.exports = function karmaConfig(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    client: {
      captureConsole: true,
    },
    files: [
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/es6-promise-polyfill/promise.js',
      'spec/SpecHelper.js',
      'spec/**/*Spec.js*',
    ],
    logLevel: config.LOG_DEBUG,
    preprocessors: {
      'spec/**/*Spec.js*': ['webpack'],
    },
    webpack: require('./webpack.config.js'),
    webpackServer: { noInfo: true },
    singleRun: true,
  });
};
