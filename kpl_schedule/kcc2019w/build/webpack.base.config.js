/*
 * @Author: 危唯
 * @Date: 2020-12-30 20:37:15
 * @LastEditTime: 2021-01-03 17:49:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\single_page_webpack\build\webpack.base.config.js
 */
const path = require('path');
const { merge } = require('webpack-merge');
const createWebpackConfig = require('../../../single_page_webpack/build/webpack.base.config');

const webpackConfig = merge(createWebpackConfig(path.resolve(__dirname, '../')), {

  // // HTML文件
  // plugins: [
  //   // HTML文件
  //   new HtmlWebpackPlugin({
  //     template: './src/index.html',
  //     inject: 'body',
  //     title: config.build.title,
  //     description: config.build.description,
  //     keywords: config.build.keywords,
  //     needVconsole: process.env.NODE_ENV !== 'production',
  //     aegisId: config.build.aegisId,
  //   }),
  // ],
});

module.exports = webpackConfig;
