const path = require('path');

// Plugins
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
  },

  entry: {
    app: './src/index.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new CopyPlugin({ patterns: [ { from: './src/assets' } ] }),
    new HtmlPlugin({ template: './src/index.html' }),
  ],

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
