const path = require('path');

const cwd = process.env.INIT_CWD || process.cwd();
const pkg = require(path.join(cwd, 'package.json'));

const plugins = [];
Object.keys(pkg.devDependencies).forEach(function (pkgName) {
  const parts = pkgName.split('/');
  const name = parts[parts.length - 1];

  if ((/^karma-/).test(name)) {
    plugins.push(require(pkgName));
  }
});


// Karma configuration
// Generated on Wed Feb 02 2022 06:01:28 GMT+0000 (Coordinated Universal Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: cwd,


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,

    // Custom
    middleware: ['staticServer'],
    plugins: plugins
  })
}