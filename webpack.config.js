process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const cssFilename = "index.css";

module.exports = {
  entry: "./src/index.js",
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    library: {
      type: 'commonjs2'
    }   
  },
  devServer: {
    contentBase: './build',
    hot: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules|build)/],
        use: {
          loader: "babel-loader",
          options: {
            compact: true,
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
      minimize: true,
      minimizer: [new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })],
  },
  plugins: [  
    new MiniCssExtractPlugin({
      filename: cssFilename
    })
  ],
};
