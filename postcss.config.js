const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer() // postcss是帮我们后处理css的，在编译完成后优化我们的css代码，例如对不同浏览器的css兼容性加前缀，比如-webkit-
  ]
}
