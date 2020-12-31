/*
 * @Author: your name
 * @Date: 2020-12-31 10:31:18
 * @LastEditTime: 2020-12-31 10:51:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\kpl_schedule\kcc2019w\build\webpack.prod.config.js
 */
'use strict'
process.env.NODE_ENV = 'production'
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseWebpackConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodWebpackConfig = require('../../../single_page_webpack/build/webpack.prod.config')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.s[ac]ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options:{
            publicPath: '../'
         }
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },
        // {
        //   loader:path.resolve(__dirname,'../scripts/webpack-plugins/dart-sass-content-loader.js')
        // },
        'sass-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options:{
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/style.css',
    })
  ],
  optimization: {//优化项
    minimizer: [ new OptimizeCSSAssetsPlugin({})],
  },
})

module.exports = webpackConfig