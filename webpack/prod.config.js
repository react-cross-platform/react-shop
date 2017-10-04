'use strict';

var webpack = require('webpack'),
  path = require('path'),
  SRC_PATH = path.join(__dirname, '../src'),
  config = require('./webpack.config'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  customTheme = require('../theme.json');

config.module.rules[1].use = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader'
    },
    {
      loader: 'less-loader',
      options: {
        paths: [SRC_PATH],
        modifyVars: customTheme
      }
    }
  ]
});

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    output: {
      comments: false
    }
  })
);

var compiler = webpack(config);

function callback(err, stats) {
  if (err) {
    console.log(err);
  } else {
    console.log(
      stats.toString({
        colors: true,
        chunks: false,
        children: false
      })
    );
  }
}

compiler.run(callback);
