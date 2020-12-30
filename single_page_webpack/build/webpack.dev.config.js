'use strict'
process.env.NODE_ENV = 'development'
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const path = require('path');
const config = require('../config');


const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  //map的映射文件
  devtool: 'source-map',
  //webpack-dev-server配置
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, './'),
    host: config.dev.host,
    port: config.dev.port,
    open:config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable
  }
})

module.exports = webpackConfig