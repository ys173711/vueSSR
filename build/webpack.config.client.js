const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge')
const config_base = require('./webpack.config.base.js');

const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV == 'development'

let defaultPlugins = [
  new webpack.DefinePlugin({ // 注意这里配置的process.env是给webpack编译打包用的，以及对vue在不同环境下的区分打包，例如vue在开发环境有很多错误信息提示代码，但是在生产环境则不需要这些代码
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"' // 注意双引号必须加，因为webpack转义代码时是单引号里面的内容，否则会认为是未定义变量而报错
    }
  }),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin(
    {
      template: path.join(__dirname, '../src/template/index.html'),
      filename: 'index.html',
      favicon: './favicon.ico', // favicon放入根目录(就是src同级的目录)，favicon是以根目录为相对路径
      inject: 'body'
    }
  ),
  new VueClientPlugin()
]

let devServer = {
  contentBase: path.join(__dirname, '../dist'),
  port: 8000,
  host: '0.0.0.0',
  overlay: {errors: true},
  // open: true,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*' // 允许热更替跨域
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {

  }
}

let config

if (isDev) {
  config = merge(config_base, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    resolve: {
      alias: {
        'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        // "@": path.resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
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
            'style-loader',
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
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // hmr热更新
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(config_base, {
    entry: {
      app: path.join(__dirname, '../src/entry-client.js'),
      vendor: ['vue']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                publicPath: '/'
              }
            },
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
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                publicPath: '/'
              }
            },
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
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'style.[contentHash:8].css',
        // chunkFilename: '[id].style.[contentHash:8].css',
        ignoreOrder: false
      })
      // new OptimizeCssAssetsPlugin() //压缩提取的css
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor',
            filename: '[name].[chunkhash:8].bundle.js',
            chunks: 'initial'
          }
        }
      }
    }
  })
}

module.exports = config;
