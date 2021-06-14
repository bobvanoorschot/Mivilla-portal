process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const cssFilename = "index.css";

module.exports = {
  entry: "./dev.js",
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  devServer: {
    contentBase: './build',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: "babel-loader",
          options: {
            compact: false,
            presets: ['@babel/react', '@babel/env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader'
        ],
      }
    ]
  },
  optimization: {
  },
  plugins: [  
    new MiniCssExtractPlugin({
      filename: cssFilename
    })
  ],
};
