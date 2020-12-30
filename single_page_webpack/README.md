这是一个用于电视台web业务中单页面应用的检测以及打包的工具。

# 1.安装

```shell
yarn
```

# 2.使用

打包src目录下的文件输出到dist中

```shell
npm run build
```

运行一个服务并热更新src下的代码

```shell
npm run dev
```

# 3.配置

可以在/config/index.js自定义配置

```js
module.exports = {
  dev: {
    assetsPublicPath: '/',
    //server设置
    host: 'localhost',
    port: 80,
    //自动打开页面
    autoOpenBrowser: true,
    //代理设置
    proxyTable:{
      "/test": {
        target: "https://op.tga.qq.com/test",
        pathRewrite: { "^/test": "/" },
        secure: true,
        changeOrigin: true,
      },
      "/build": {
        target: "https://op.tga.qq.com",
        pathRewrite: { "^/build": "/" },
        secure: true,
        changeOrigin: true,
      }
    }
  },
  build: {
    assetsPublicPath: './',
    assetsRoot: path.resolve(__dirname, '../dist'),
    //页面标题
    title:'王者荣耀电视台',
    //上报的项目ID
    aegisId:1832,
  }
}
```

