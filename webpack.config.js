var webpack = require('webpack');
var path = require('path');

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
     'jQuery' : 'jquery'
   })
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
//    Now we use modulesDirectories instead. Ta-da!
//      TodoApp: 'app/components/TodoApp.jsx',
// But we still use alias for some other things:
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
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
  devtool : 'cheap-module-eval-source-map'
};
