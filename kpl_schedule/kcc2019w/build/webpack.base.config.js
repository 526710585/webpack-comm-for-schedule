/*
 * @Author: 危唯
 * @Date: 2020-12-30 20:37:15
 * @LastEditTime: 2021-01-03 17:27:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\single_page_webpack\build\webpack.base.config.js
 */
// const path = require('path')
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const createWebpackConfig = require('../../../single_page_webpack/build/webpack.base.config');
const config = require('../config');

const webpackConfig = merge(createWebpackConfig(__dirname), {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: config.build.assetsRoot,
    chunkFilename: 'js/[name].chunk.js',
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },
  // HTML文件
  plugins: [
    // HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      title: config.build.title,
      description: config.build.description,
      keywords: config.build.keywords,
      needVconsole: process.env.NODE_ENV !== 'production',
      aegisId: config.build.aegisId,
    }),
  ],
});

module.exports = webpackConfig;
