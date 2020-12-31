/*
 * @Author: your name
 * @Date: 2020-12-30 20:37:15
 * @LastEditTime: 2020-12-31 16:14:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\single_page_webpack\.eslintrc.js
 */

const path = require('path');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    path.join(__dirname, './scripts/eslint-rules/base.js'),
    path.join(__dirname, './scripts/eslint-rules/import.js'),
  ],
  env: {
    es6: true,
    browser: true,
    jquery: true,
    node: true,
  },
  globals: {
    // commjs中的全局变量
    TGAJSMethods: 'readonly',
    // 获取手机型号用到的JS
    getCellOS: 'readonly',
    // 上报
    Aegis: 'readonly',
    setSite: 'writable',
    pgvMain: 'readonly',
  },
  plugins: ['html', 'vue'],
  rules: {
    'no-console': 'warn',
  },
};
