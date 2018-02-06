'use strict';

var webpack = require('webpack');
let path = require('path');

console.log(path.join(__dirname, './src'));

module.exports = {
  entry: {
    RotateMenu: './src/RotateMenu.jsx',
    vendor: ['react', 'react-dom', 'classnames']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {}
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, './src')],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    'react': 'react'
  }
};
