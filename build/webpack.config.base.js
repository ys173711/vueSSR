const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: path.join(__dirname, '../src/entry-client.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: isDev ? 'bundle.[hash:8].js' : 'bundle.[chunkhash:8].js',
    publicPath: 'http://127.0.0.1:8000/public/' // 基路径
  },
  module: {
    rules: [
      {test: /\.(vue|js|jsx)$/, use: 'eslint-loader', exclude: /node_modules/, enforce: 'pre'},
      {test: /\.vue$/, use: 'vue-loader', include: path.join(__dirname, '../src')
      },
      {test: /\.js$/, use: 'babel-loader', include: path.join(__dirname, '../src'), exclude: /node_modules/},
      {test: /\.jsx$/, use: 'babel-loader', include: path.join(__dirname, '../src')},
      {test: /\.(png|jpg|jpeg|gif|ttf|woff|svg)/,
        use: [
          {
            loader: 'url-loader', // file-loader只是读取文件然后换个名字存在另外的地方，url-loader对file-loader封装了，对于小于limit大小的文件会转换成base64代码存在js文件里，减少了http请求
            options: {
              limit: 1024,
              name: 'resources/[path].[name].[hash:8].[ext]' // 对于超过limit大小的图片就保存。[name]原来的名字，[ext]原来的文件后缀

            }

          }
        ]}
    ]
  }

}

module.exports = config;
