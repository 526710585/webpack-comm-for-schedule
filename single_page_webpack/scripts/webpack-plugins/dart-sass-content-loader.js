// 本loader处理dart sass引入Unicode编译过程会被转译的问题
// 这里处理的方案是再转译回来
// 使用了库兼容低版本nodejs正则规范较低的问题

// eslint-disable-next-line import/no-extraneous-dependencies
const XRegExp = require('xregexp');
/**
 * 处理默认配置选项
 * @param {*} source 输入源
 * @return {*} handledSource 返回结果
 */
module.exports = function dartSassContentLoader(source) {
  // 处理 source ...
  let handledSource = source;

  const exp = XRegExp('\\pC', 'gA');
  const ignoreList = ['%uFEFF', '%0A'];

  /**
   * 正则输出替换公式
   * @param {string} match 匹配对象
   * @return {string} 匹配结果
   */
  const target = (match) => {
    if (ignoreList.includes(escape(match))) return match;

    return escape(match).replace('%u', '\\').toLocaleLowerCase();
  };

  handledSource = XRegExp.replace(handledSource, exp, target);

  return handledSource;
};
