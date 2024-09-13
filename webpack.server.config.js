// webpack.server.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Server-side entry point
  entry: './app.js', // Path to your server-side code

  // Output for Node.js
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.bundle.js',
  },
  devServer: {
    static: './dist',
    port: 8080
  },
  // Targeting Node.js environment
  target: 'node',

  externals: [nodeExternals()], // Exclude node_modules from bundling

  module: {
    rules: [
      // JavaScript transpiling
      {
        test: /\.js$/,
        include: path.resolve(__dirname),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  // Source map support for easier debugging
  devtool: 'source-map',
};
