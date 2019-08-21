# mpsudoku469

> A Mpvue project

## Build Setup

``` bash
# 安装依赖（注意查看package.json里面模块的安装版本号）
npm install

# 小程序运行
npm run dev

# H5运行
npm run devH5

# 小程序打包（打包到dist目录)
npm run build

# H5打包（打包到distH5目录)
npm run buildH5

```

## 一、mpvue只打包小程序
通过mpvue 官方文档 构建项目

url 路由参数通过 this.root.mp.query获取，并且在page onLoad 时候传递的 options，即mounted生命函数中能获取

之前的this.router.push改成小程序支持的wx.navigateTo(url)，this.router.replace 改成 wx.reLaunch({ url })，其他相关的api 均改成对应的微信小程序的api

vuex 的使用，官方给的demo是pages 文件每个page页面各一个store.js储存数据；可以直接挂到Vue原型上，在入口文件main.js中：
import store from ‘./store’
Vue.prototype.$store = store

## 二、添加打包成H5配置
### 安装
安装对应的module vue 、vuex、vue-loader、vue-style-loader、vue-template-compiler、webpack-dev-server等
具体配置文件可查看package.json


### 配置：
在原有的基础上添加webpack 开发打包buildH5 和 configH5配置文件 ,以及对应的路由配置文件router ，AppH5.vue入口vue 文件，mainH5.js 编译入口文件，以及对H5和wx 分别封装的方法及api
在configH5中配置build 输出的文件目录为distH5 :

``` bash
index: path.resolve(__dirname, ‘../distH5/index.html’)
assetsRoot: path.resolve(__dirname, ‘../distH5’)
在package.json 文件中配置编译和打包文件的命令执行语句
“devH5”: “webpack-dev-server –inline –progress –config buildH5/webpack.devH5.conf.js”,
“all”: “npm run dev && npm run devH5”,
“buildH5”: “node buildH5/build.js”
```

### 注意配置文件
.postcssrc.js 此条为编译微信的时候需用配置 “postcss-mpvue-wxss”: {}，转化成wxss有特别棒的效果，可以优化css的样式，编译成wxss可识别的样式代码，转化效果

添加”postcss-mpvue-wxss”: {} 编译后效果


解决方法：转化成H5时不需要”postcss-mpvue-wxss”: {}，否则可能会造成页面样式混乱，可以直接注释掉此行，或者在打包配置文件里面取消postcss 插件编译的配置

打包成H5的配置内容
``` bash
AppH5.vue 添加入口设置
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>
```

main.js 和 mainH5.js 通过Vue.mixin分别配置微信小程序和H5的相同功能但不同api 的方法及变量

Api 中的两个文件同上的功能，对于同一个功能对微信小程序和Vue 分别封装对应的方法

### 运行打包
接下来 npm run devH5 就是H5的页面啦，可以用浏览器打开，npm run dev 就是小程序代码，可以用微信开发者工具浏览，build 打包同上

