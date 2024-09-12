const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Входной файл
  entry: './app.js',

  // Выходной файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "/",
  },

  target: 'node',
  externals: [nodeExternals()],

  // Source maps для удобства отладки
  devtool: 'source-map',

  module: {
    rules: [
      // Транспилируем js с babel
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './public/src/js'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.ejs$/i,
        exclude: /node_modules/,
        loader: 'html-loader'
      },

      // Компилируем SCSS в CSS
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

      // Подключаем шрифты из css
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'name].[hash].[ext]',
              outputPath: 'public/fonts',
              publicPath: '/fonts',
            }
          }
        ]
      },

      // Подключаем картинки из css
      {
        test: /\.(svg|png|jpg|jpeg|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'name].[hash].[ext]',
              outputPath: 'public/img',
              publicPath: '/img',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Подключаем файл html, стили и скрипты встроятся автоматически
    new HtmlWebpackPlugin({
      title: 'ZUM',
      filename: 'index.html',
      template: './views/index.ejs',
      templateParameters: {
        webpackAssetPath: (asset) => `/public/${asset}`, // Adjust this according to your asset output path
      },
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),

    // Кладем стили в отдельный файлик 
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.cjs', '.ejs']
  }
}