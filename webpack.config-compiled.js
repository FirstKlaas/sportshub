'use strict';

// Initialization
var webpack = require('webpack');

// File ops
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Folder ops
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

// PostCSS support
var postcssImport = require('postcss-easy-import');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

// Constants
var APP = path.join(__dirname, 'app');
var BUILD = path.join(__dirname, 'build');
var STYLE = path.join(__dirname, 'app/style.css');
var PUBLIC = path.join(__dirname, 'app/public');
var TEMPLATE = path.join(__dirname, 'app/templates/index.html');
var NODE_MODULES = path.join(__dirname, 'node_modules');
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

module.exports = {
  // Paths and extensions
  entry: {
    app: APP,
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  // Loaders for processing different file types
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
      include: APP
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss'],
      include: [APP, NODE_MODULES]
    }, {
      test: /\.json$/,
      loader: 'json',
      include: [APP, NODE_MODULES]
    }]
  },
  // Configure PostCSS plugins
  postcss: function processPostcss(webpack) {
    // eslint-disable-line no-shadow
    return [postcssImport({
      addDependencyTo: webpack
    }), precss, autoprefixer({ browsers: ['last 2 versions'] })];
  },
  // Source maps used for debugging information
  devtool: 'eval-source-map',
  // webpack-dev-server configuration
  devServer: {
    historyApiFallback: true,
    hot: true,
    progress: true,

    stats: 'errors-only',
    proxy: {
      '/api': {
        target: {
          host: 'localhost',
          port: 9090,
          protocol: 'http'
        },
        pathRewrite: { '^/api': '' },
        secure: false,
        ignorePath: false,
        changeOrigin: true
      }
    },
    host: HOST,
    port: PORT,

    // CopyWebpackPlugin: This is required for webpack-dev-server.
    // The path should be an absolute path to your build destination.
    outputPath: BUILD
  },
  // Webpack plugins
  plugins: [
  // Required to inject NODE_ENV within React app.
  // Reduntant package.json script entry does not do that, but required for .babelrc
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development') // eslint-disable-line quote-props
    }
  }), new webpack.HotModuleReplacementPlugin(), new CopyWebpackPlugin([{ from: PUBLIC, to: BUILD }], {
    ignore: [
    // Doesn't copy Mac storage system files
    '.DS_Store']
  }), new HtmlWebpackPlugin({
    template: TEMPLATE,
    // JS placed at the bottom of the body element
    inject: 'body'
  })]
};

//# sourceMappingURL=webpack.config-compiled.js.map