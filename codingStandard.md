# 1.使用统一编辑器visual studio code (VScode)
# 2.VScode拓展插件安装三个
        ESLint (Dirk Baeumer)
        Vetur (Pine Wu)
    ##采用Vue框架开发，所以安装Vetur用来高亮和格式化文件
    ##在VScode的setting.json中配置这些插件：
    {
        // ------代码规范------start
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            "vue-html",
            { "language": "vue", "autoFix": true }
        ],
        "eslint.autoFixOnSave": true,
        "vetur.format.options.tabSize": 2,
        "vetur.format.defaultFormatterOptions": {
            "js-beautify-html": {
                "wrap_attributes": "auto"    
            }
        },
        "vetur.format.defaultFormatter.html": "js-beautify-html"
        // ------代码规范------end
    }
# 3.在项目的.eslintrc.js文件配置统一代码检测规范。以现在的严格为准，在使用过程中实际情况放宽部分规范。
    ##  1.安装eslint
        cnpm i eslint -g  //全局安装
        cnpm i eslint -D  //局部安装
    ##  2.初始化eslint
        eslint --init  //得到.eslintrc.js文件或者手动写一个该文件，为了方便写注释不用.eslintrc文件
    ##  3.配置.eslintrc.js文件

        

