var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

// available in Node
// 'production' in prod up on Heroku
// Will be nothing, on local ... or...
// WHICH ENVIRONMENT?
// 'test' 'development' 'production'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ENVIRONMENT VARIABLES FOR THAT ENVIRONMENT
try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {
  // ignore
}

module.exports = {
// script! invokes "script loader", for webpack purposes
  entry : [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
 ],
 // lets Foundation attach to the jQuery object ...
 externals : {
   jquery : 'jQuery'
 },
 // Tell webpack to watch for var names (on left)
 // and to automatically swap in (provide) the plugin (on right)
 // Essentially, this obviates need to require jQuery everywhere...
 plugins: [
   new webpack.ProvidePlugin({
     '$': 'jquery',
     'jQuery' : 'jquery',
   }),
   new webpack.optimize.UglifyJsPlugin({
     compressor : {
       warnings: false,
     },
   }),
// FROM react-11-14 (we are in react-11-13)
// webpack DefinePlugin: Define variables that go into the BUNDLE
// Note: THe value (on right side of ":") is evaluated as JavaScript:
// 'test'  << No
// '"test"'  << Yes. value we want is in fact a String
// JSON.stringify(process.env.NODE_ENV) << Yes. As above, value we want is a String, but this is a  Better way to get it.
   new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_KEY: JSON.stringify(process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
        MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
      },
    }),
 ],
  output : {
    path : __dirname, // current directory (root)
    filename : './public/bundle.js'
  },
  resolve : {
    root : __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/api',
    ],
    alias : {
      // Further update (Lecture 131 07:50)
      // with this, e.g. in actions.jsx, we can put
      //  ... from 'app/firebase/'  << with no explicit alias for firebase here in webpack.config.js. Bueno.
      app: 'app', // NO final slash.
//    Now we use modulesDirectories instead. Ta-da!
//      TodoApp: 'app/components/TodoApp.jsx',
// But we still use alias for some other things:
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx',
      lilInspector: 'app/lilInspector.js',
    },
    extensions : ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        loader : 'babel-loader',
        // run through react, then through es2015 ..
        query : {
          presets : ['react', 'es2015', 'stage-0']
        },
        test : /\.jsx?$/, // regex! ends in '.jsx'
        // we have no bower_components ... fwiw
        exclude : /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  /*
  SOURCEMAPS
  Generate for dev/local only, not in production
  (they're huge!)
https://www.udemy.com/the-complete-react-web-app-developer-course/learn/v4/t/lecture/5647320
... "inline-source-map" or "eval-source-map" instead.
  */
  devtool : process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map',
};
