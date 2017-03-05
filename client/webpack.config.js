//var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, '../build/client');
var APP_DIR = path.resolve(__dirname);

var config = {
  entry: {
    bundle: APP_DIR + '/index.js',
    sw: APP_DIR + '/serviceworker/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HA Bridge Configuration',
      template: 'index.ejs',
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons' },
      { from: 'css', to: 'css' },
      { from: 'manifest.json', to: 'manifest.json'},
      { from: 'offline.html', to: 'offline.html'}
    ])
  ],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
