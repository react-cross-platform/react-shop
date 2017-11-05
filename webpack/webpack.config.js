"use strict";

require("dotenv").config();

const path = require("path"),
  webpack = require("webpack"),
  HtmlwebpackPlugin = require("html-webpack-plugin");

const SRC_PATH = path.join(__dirname, "../src"),
  STATIC_PATH = path.join(__dirname, "../static"),
  DIST_PATH = path.join(__dirname, "../static/dist/app");

const __DEV__ = process.env.NODE_ENV !== "production";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const bundleConfig = __DEV__
  ? require(STATIC_PATH + "/cache/bundle-config.json")
  : require(STATIC_PATH + "/dist/lib/bundle-config.json");

module.exports = {
  context: SRC_PATH,
  entry: {
    app: ["../src/main.tsx"]
  },
  output: {
    path: DIST_PATH,
    publicPath: __DEV__
      ? `http://${process.env.LOCAL_IP}:${process.env.PORT}`
      : "/static/dist/app/",
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              configFileName: __DEV__ ? "tsconfig.json" : "tsconfig.prod.json"
            }
          }
        ]
      },

      {
        test: /\.less|.css$/,
        use: [],
        exclude: /src/
      },

      // project styles with CSS Modules
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "../src")],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }
        })
      },
      {
        test: /\.gql$/,
        use: "raw-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|gif)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [require.resolve("antd-mobile").replace(/warn\.js$/, "")]
      }
    ]
  },
  resolve: {
    modules: [SRC_PATH, "node_modules"],
    alias: {
      "@src": SRC_PATH
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.PROJECT_NAME": JSON.stringify(process.env.PROJECT_NAME),
      "process.env.DEBUG": process.env.NODE_ENV == "development",
      "process.env.GRAPHQL_ENDPOINT": JSON.stringify(
        process.env.GRAPHQL_ENDPOINT
      )
    }),

    new HtmlwebpackPlugin({
      filename: "index.html",
      chunks: ["app"],
      template:
        SRC_PATH + "/template/" + (__DEV__ ? "app.dev.html" : "app.prod.html"),
      assets: {
        style: "[name]-[hash].css"
      },
      bundleName: bundleConfig.bundle.js,
      minify: __DEV__
        ? false
        : {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeComments: true
          }
    }),

    new webpack.DllReferencePlugin({
      context: ".",
      manifest: __DEV__
        ? require("../static/cache/bundle-manifest.json")
        : require("../static/dist/lib/bundle-manifest.json")
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: SRC_PATH,
        output: {
          path: DIST_PATH,
          publicPath: "",
          filename: "[name]-[hash].js",
          chunkFilename: "[name]-[chunkhash].js"
        },
        postcss: []
      }
    }),

    new ExtractTextPlugin({
      filename: "[name]-[hash].css",
      allChunks: true
    })
  ]
};
