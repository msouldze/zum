// webpack.client.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Client-side entry point
  entry: './public/js/index.js', // Path to your client-side JS

  // Output for the browser
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  // Targeting the web (browser)
  target: 'web',

  module: {
    rules: [
      // JavaScript transpiling
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'public/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      
      // CSS handling
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
            options: {
              includePaths: require('node-normalize-scss').includePaths
            }
          }
        ]
      },
      // Image and font handling
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
            name: '[name].[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
