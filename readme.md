# Vue+Vue-Router+Vuex+SSR

> vue全家桶和vuessr Demo

[线上地址](http://www.baidu.com)

目前版本为 `v1.0.0`

## Extra

分支 [test](http://www.baidu.com)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

配套教程:
- [基础篇](http://www.baidu.com)
- [进阶篇](http://www.baidu.com)
- [优化篇](http://www.baidu.com)

[使用文档](http://www.baidu.com) 

## Build Setup

```bash
# 克隆项目
git clone https://github.com/ys173711/vueSSR

# 进入项目目录
cd vueSSR

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
```

### 客户端渲染

```bash
# 启动服务
npm run dev:client

# 打包应用
npm run build:client
```
浏览器访问 [http://localhost:8000](http://localhost:8000)

### 服务端渲染

```bash
# 需要首先打包客户端渲染应用
npm run build:client

# 启动服务
npm run start

# 打包应用
npm run build
```
浏览器访问 [http://localhost:3333](http://localhost:3333)

### 同时启动两种渲染 开发模式

```bash
# 首先清除两种模式下生成的manifest(可选)
npm run clean

# 启动服务
npm run dev
```

浏览器访问 
客户端 [http://localhost:8000](http://localhost:8000)
服务端 [http://localhost:3333](http://localhost:3333)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/ys173711/vueSSR) license.

Copyright (c) 2019-present YangSen