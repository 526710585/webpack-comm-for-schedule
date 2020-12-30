/*
 * @Author: your name
 * @Date: 2020-12-30 20:37:15
 * @LastEditTime: 2020-12-30 21:29:12
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \webpack-comm-for-schedule\single_page_webpack\.eslintrc.js
 */
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['./scripts/eslint-rules/base.js', './scripts/eslint-rules/import.js'],
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
  plugins: ['html', 'vue', 'promise'],
  rules: {
    // 返回每个目录then()以创建可读和可重用的Promise链。
    'promise/always-return': 'error',
    // 避免在不需要时Promise.resolve或Promise.reject不需要时包装值。
    'promise/no-return-wrap': 'error',
    // 创建新的Promise时，强制使用一致的参数名称和顺序。
    'promise/param-names': 'error',
    // 强制使用catch()未归还的promise。
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    // 避免嵌套then()或catch()语句
    'promise/no-nesting': 'warn',
    // 避免在回调中使用Promise
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'off',
    'promise/avoid-new': 'off',
    // 避免调用newPromise静态方法
    'promise/no-new-statics': 'error',
    // 禁止中的return语句 finally()
    'promise/no-return-in-finally': 'warn',
    // 确保将正确数量的参数传递给Promise函数
    'promise/valid-params': 'warn',
  },
};
