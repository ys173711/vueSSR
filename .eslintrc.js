module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint', //指定js的检测处理器
        ecmaVersion: 2018
    },
    env: { //指定要启用的环境，检测时不会把这些环境的全局变量识别为未定义的而报错
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    parser: 'vue-eslint-parser',
    extends: [
        //切换更严格检测模式
        //'plugin:vue/recommended' 'plugin:vue/strongly-recommended'
        'plugin:vue/essential', 
        'standard'
    ],
    plugins: ['vue'],
    rules: {
        "eqeqeq": ["off"],  //关闭===的强检测
        "no-tabs": "off",  //关闭tabs键缩进
        "no-unused-vars": "off", //关闭未使用过的变量
        "no-extra-semi": "off", //不允许使用不必要的分号
        "no-caller": "off", //不允许用arguments.callee arguments.caller
        "camelcase": [0], //允许驼峰命名
        "semi": 0, // 允许使用分号
        "quotes": [0], //关闭双引号
        "no-useless-return": 0 //没必要的return语句
    }
}