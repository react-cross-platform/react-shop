"use strict";

const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");

const CACHE_PATH = path.join(__dirname, "../static/cache"),
  LIB_PATH = path.join(__dirname, "../static/dist/lib");

const __DEV__ = process.env.NODE_ENV !== "production";

const config = {
  entry: {
    bundle: [
      "react",
      "react-dom",
      "react-redux",
      "react-router",
      "react-router-dom",
      "react-router-redux",
      "redux",
      "redux-thunk",
      "classnames",
      "es6-promise"
    ]
  },
  output: {
    path: __DEV__ ? CACHE_PATH : LIB_PATH,
    filename: "[name].[hash].js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__DEV__ ? CACHE_PATH : LIB_PATH, "[name]-manifest.json"),
      name: "[name]_library"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": __DEV__
        ? JSON.stringify("development")
        : JSON.stringify("production")
    }),
    new AssetsPlugin({
      filename: "bundle-config.json",
      path: __DEV__ ? CACHE_PATH : LIB_PATH
    })
  ]
};

if (__DEV__) {
  config.entry.bundle.push("redux-logger");
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  );
}

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
        // modules: true,
        // modulesSort: 'size'
      })
    );
  }
}

compiler.run(callback);
