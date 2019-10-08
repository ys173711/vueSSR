const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin');
const config_base = require('./webpack.config.base.js')
const merge = require('webpack-merge')

const isDev = process.env.NODE_ENV == 'development'

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"',
      VUE_ENV: '"server"'
    }
  }),
  new VueLoaderPlugin(),
  new VueServerPlugin()
]
/* if (isDev) {
  plugins.push(new VueServerPlugin())
} */

let config = merge(config_base, {
  mode: isDev ? 'development' : 'production',
  target: 'node', // 指定ssr打包运行环境
  entry: {
    app: path.join(__dirname, '../src/entry-server.js')
  },
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // 指定用nodeJs模块系统module.exports require，因为浏览器端是不支持这种js的运行方式
    filename: '[name].js', // 不需要使用浏览器的缓存即不需用hash
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies), // 指定外部用的js，即不打包进出口文件
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader', // 注意ssr只能用vue-style-loader，不能用style-loader，因为vue-style-loader对执行环境进行了判断优化
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          }
        ],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          },
          'stylus-loader'
        ],
        include: path.join(__dirname, '../src')
      }
    ]
  }
})

module.exports = config;
