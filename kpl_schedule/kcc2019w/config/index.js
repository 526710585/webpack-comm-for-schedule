/*
 * @Author: your name
 * @Date: 2020-12-30 20:37:15
 * @LastEditTime: 2021-01-03 18:34:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\single_page_webpack\config\index.js
 */

module.exports = {
  dev: {
    assetsPublicPath: '/',
    // server设置
    host: 'localhost',
    port: 80,
    // 自动打开页面
    autoOpenBrowser: true,
    // 代理设置
    proxyTable: {
      '/test': {
        target: 'https://op.tga.qq.com/test',
        pathRewrite: { '^/test': '/' },
        secure: true,
        changeOrigin: true,
      },
      '/build': {
        target: 'https://op.tga.qq.com',
        pathRewrite: { '^/build': '/' },
        secure: true,
        changeOrigin: true,
      },
    },
  },
  build: {
  },
}
;
