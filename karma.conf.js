var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
 config.set({
   browsers: ['Chrome'],
   singleRun: true,
   frameworks: ['mocha'],
   // Needed to add jQuery and Foundation too! (from webpack config)
   files: [
       'node_modules/jquery/dist/jquery.min.js',
       'node_modules/foundation-sites/dist/foundation.min.js',
       'app/tests/**/*.test.jsx',
   ],
   preprocessors: {
     'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
   },
   reporters: ['mocha'],
   client: {
     mocha: {
       timeout: '5000'
     }
   },
   webpack: webpackConfig,
   webpackServer: {
     noInfo: true,
   },
 });
};

// http://karma-runner.github.io/1.0/config/configuration-file.html

/* Hmm, taken OUT, I DO get console.log to appear in my test output. Hmm.
client: {
  captureConsole: true
}
*/
// http://stackoverflow.com/questions/20430689/how-to-capture-console-error-with-karma-unit-test-runner
