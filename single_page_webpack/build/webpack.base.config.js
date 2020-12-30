const path = require('path');
const config = require('../config');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'test',
  entry: {
    'index': './src/index.js',
  },
  output: {
    path: config.build.assetsRoot,
    chunkFilename: 'js/[name].chunk.js',
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'?config.build.assetsPublicPath:config.dev.assetsPublicPath,
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'eslint-loader',
        enforce: 'pre', // 编译前检查
        include: [path.resolve(__dirname, 'src')], // 指定检查目标
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter'), // 指定错误报告的格式规范
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        // 使用url-loader处理图片资源，当图片size小于limit值时会转为DataURL
        test: /\.(jpg|bmp|png|jpeg|gif|tiff)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            outputPath: "img",
          }
        }]
      },
      {
        // 使用url-loader处理字体
        test:/.(woff|woff2|eot|ttf|otf|TTF|svg).*?$/,
        use: [{
          loader: "url-loader",
          options: {
            outputPath: "font",
          }
        }]
      },
      {
        // 处理css等样式文件
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader:path.resolve(__dirname, '../scripts/webpack-plugins/dart-sass-content-loader.js')
          },
          "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
          "postcss-loader",
        ]
      },
    ],
  },
  // 代码分割codeSpliting
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
    }
  },
  plugins: [
    //HTML文件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      title: config.build.title,
      description: config.build.description,
      keywords: config.build.keywords,
      needVconsole: process.env.NODE_ENV !== 'production',
      aegisId: config.build.aegisId,
    })
  ],
};