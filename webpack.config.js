const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackMode = process.env.mode || "development";

const outputBaseDir = "./dist";

const webpackConfig = {
  mode: webpackMode,
  devtool: "eval-source-map",
  entry: path.resolve(__dirname, "./src/index.ts"),
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, outputBaseDir),
    filename: "[name][fullhash].bundle.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-typescript"],
                plugins: [
                  ["@babel/plugin-proposal-decorators", { legacy: true }],
                  "@babel/plugin-proposal-class-properties",
                ],
              },
            },
          },
          {
            test: /\.glsl$/,
            exclude: /node_modules/,
            use: {
              loader: path.resolve("./glsl-loader"),
              options: {},
            },
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|wav|mp3|ttf)$/,
            use: {
              loader: "file-loader",
              options: {
              },
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: [".ts", ".js"], fallback: { querystring: false } },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webrtc example",
      template: path.resolve(__dirname, "./example/example.html"),
    }),
  ],

  devServer: {
    port: 3000,
    // static: {
    //   directory: path.join(__dirname, "src"),
    // },
    open: false,
  },
};

module.exports = webpackConfig;
