var path = require('path');
var nodeExternals = require('webpack-node-externals');
require("babel-polyfill");


module.exports = {
  entry: ['babel-polyfill', './app.js'],
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: ['koa']
    })
  ]
}