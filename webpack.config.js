const path = require('path');

// Plugins
const CopyPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: './dist',
  },

  entry: {
    app: './src/index.js',
  },

  module: {
    rules: [
      {
        test: /\.(s)?css$/i,
        use: [
          isProduction ? CssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyPlugin({ patterns: [ { from: './src/assets' } ] }),
    new CssExtractPlugin(),
    new HtmlPlugin({ template: './src/index.html' }),
  ],

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
