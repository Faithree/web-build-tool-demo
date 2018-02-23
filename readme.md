>本仓库持续更新

>教程自动忽略命令行的形式，一律采用配置文件的方式,使用npm

安装
```
npm install webpack -g
```

## Babel
```
npm install babel-loader babel-core babel-preset-env --save-dev   
```
```
index.js

document.write('<h1>乘风gg</h1>  ')
let func = () => {}
console.log([1, 2, 3].includes(3, 3));  // false
```
编译之后
![](https://user-gold-cdn.xitu.io/2018/2/11/16184495a18fea32?w=772&h=338&f=png&s=27035)
发现includes是没被转换的，因为babel只编译语法，不会转换函数和方法(Array.from generator等),需要添加两个插件
```
npm install babel-polyfill --save-dev   
```
## 提取公共代码块
* CommonsChunkPlugin，是多entry才会生效
* 当你入口有多个，但无法区分哪个引入公共代码块，也不会生效(即需要所有入口都引入公共代码块，就可以自动抽离),需要手动指明name
* CommonsChunkPlugin指定chunks
### 代码分割和懒加载
其实说的是同一件事情

require.ensure依赖promise，不兼容低版本浏览器
```
require.ensure(['vue'],function () { 
  // 第一个vue只是加载vue进页面(可以省略)，只有第二个vue才真正执行
  var vue = require('vue')
},'vue'/*名字*/)
```
* require.include
  两个子模块依赖一个第三方模块的时候，可以提前把第三方模块放到父模块，这样动态加载子模块的时候就已经加载第三方模块，打包出来的结果是第三方模块在父模块里，类似commonChunk里面的async
* system.import()->import()
* import().then((vue)=>{})
publicPath:其实也是chunkHash模块对应的
```
 minChunks: ({resource}, count) => {
        console.log(resource)
        console.log(count)
      },
count指的是一个入口里面被使用的次数，当你多个entry里面的chunk引用多次，其实还是1次
```
动态import是会执行的，require.ensure是不会执行的
## css 
style-loader css-loader

![](https://user-gold-cdn.xitu.io/2018/2/14/161929d805b356e6?w=401&h=84&f=png&s=7204)
## url(link的方式)
```
 use: [
        {
          loader: 'style-loader/url',
        },
        {
          // loader: 'css-loader',
          loader: 'file-loader',
        }
      ],
```
## useable(手动使用)
```
{
          loader: 'style-loader/useable',
        },
        {
          loader: 'css-loader',
        }
```
css module 
预处理器sass/less
提取css(提取公共代码等)
## less/scss
```
npm install less less-loader -D
npm install sass node-sass -D
```
## extractTextPlugin

## postCss
```
postcss
post-loader
autoprefixer
cssnano
postcss-cssnext
```
css-loader内部压缩也是使用了cssnano
post-loader要放在css-loader之后，放在预处理器语言之前
```
     {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-cssnext')(),
                require('cssnano')(),
                require('postcss-cssnext')()
              ]
            }
          },
```

BrowserList配置

package.json里配置一份，所有插件都共用
```
 "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
```
## tree shaking
一般用在生产环境,支持es6 module 配合插件
使用场景：常规优化减小体积，引用第三方库的部分功能

## js shaking
当引入第三方库不支持tree-shaking 的时候，先去找一找有没有es版本，假如还不支持，可以试试babel-plugin
## css shaking
```
npm install purify-css -D
npm install purifycss-webpack -D
npm install glob-all  -D
```
> purifyCss 要写在extractTextWebpackPlugin 后边
> purifyCss 不能跟css module一起使用

## image（优化）
* 雪碧图
* 压缩图片
* base64
```
npm install url-loader img-loader file-loader postcss-sprites -D
```
因为生产环境和开发环境所依赖的地址是不一样的，或者说打包到一个独立的地方，所以最好配置一下
```
{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          // publicPath: '',
          outputPath: 'dist/',
          useRelativePath: true
        }
      }]
    }
```
转base64
```
{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name:'[name].min.[ext]',
            limit: 20000,
            // publicPath: '',
            outputPath: '/dist/',
            useRelativePath: true
          }
        }]
      }
```
图片压缩
```
  {
            loader: 'img-loader',
            options: {
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false
              },
              optipng: false, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2
              },
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { convertPathData: false }
                ]
              }
            }
          },
```
合成雪碧图和打包retina屏幕的操作(需要把图片加上@2x,还要把容器缩小一半)
```
 {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-sprites')({
                  spritePath:'dist/img/sprites',
                   retina: true
                })
              ]
            }
          }
```
## 处理字体
```
  {
        test: /\.(eot|woff2?|woff|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 2000,
              outputPath: '/dist/',
              useRelativePath: true
            }
          }
        ]
      }
```
### alias 
root:'d:' //子站公共的库
### external 
配合provider插件可以实现cdn的功能
## 引入第三方js库
* webpack.providePlugin结合alias 
* imports-loader(自动)结合alias 

## 自动生成html,可以自动插入css js
自动生成html
```
  new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
```
引入图片
```
src="${require('路径')}“

或者用html-loader(可能会出现路径问题，因为他是跟url-loader相关联的)
   {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              publicPath: '',
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
```

场景优化(让script标签减少http请求)
```
npm install html-webpack-inline-chunk-plugin
```
## 搭建web-server
* webpack-dev-server
* express-webpack-dev-middlewawre

webpack-dev-server是个很强大的工具,他就是一个简易的服务器，所以他有很多服务器的功能，例如接口代理，https，路径重定向，live reloading 

history模式
```
 historyApiFallback: {
      // 本质是connectHistoryApiFallback
      rewrites: [
        // 可以使用正则
        {
          from: '/example/index',
          to: '/index.html'
        }
      ]
    }
```
代理
```
proxy: {
      // 这里举例一个本地服务器的地址或者局域网内的地址
      '/api': {
        target: 'http://172.16.186.20:3000',
        host: 'http://localhost:8000',
        loglevel:'debug', // 代理信息
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        },
        headers:{
          // 一般用不上，主要用于未作登陆页面的测试页面
          // 伪造浏览器请求
          'Cookie':''
        }
      }
    }
```
模块热更新(这里很多误区)
```
 hot:true
 new webpack.HotModuleReplacementPlugin(),
 new webpack.NamedModulesPlugin()
 以上很多人认为都是热更新的，其实并不是。还要分情况
css热更新，假如使用了extract,页面是不会改变的(本质以来了satyle-loader)，需要去除extract插件
js热更新需要加上hotOnly: true
并且代码内要使用module.hot来判断，通过module.hot.accept来热更新
合理使用accept的回掉函数进行移除和添加dom
```
## sourceMap
* js Devtool
* css css-loader.option.sourcemap
所有的loader都加上sourcemap：true
singleto:true要注释掉

## eslint 
```
npm install eslint eslint-loader eslint-plugin-html eslint-friendly-formatter --save-dev
npm install eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard --save-dev
```
## 区分开发环境和生产环境
因为不同环境需要的功能是不一样的
* 共同点
  * 相同入口
  * 相同loader
* 开发环境
  * 模块热更新
  * sourceMap
  * eslint
  *  proxy
  
* 生产环境
    * 提取公共代码
    * 压缩代码
    * 混淆代码
    * tree shaking
```
npm install webpack-merge --save-dev
```
## middleware
```
npm install express webpack-dev-middleware webpack-hot-middleware http-proxy-middleware opn connect-history-api-fallback --save-dev
```
## 打包分析
```
webpack -profile --json 结合http://webpack.github.io/analyse/
npm install webpack-bundle-analyzer
```
## 提高打包速度

* dllPlugin DllReferencePlugin
* new UglifyJSPlugin({
        parallel: true,
        cache:true
    })
* HappyPack    
* babel开启cache 规范include exclude
* 减少resolve
* 去除sourceMap
```
    new webpack.DllReferencePlugin({
      manifest:require('../src/dll/ui-manifest')
    }),
    new webpack.DllReferencePlugin({
      manifest:require('../src/dll/vue-manifest')
    }),
```
![](https://user-gold-cdn.xitu.io/2018/2/22/161bb51a04e6796d?w=373&h=140&f=png&s=8105)

![](https://user-gold-cdn.xitu.io/2018/2/22/161bb68129518df2?w=422&h=91&f=png&s=6605)

## 打包实践
动态模块要命名
## 路径问题
路径问题假如解决不了，一律用http服务器的思路去解决，直接指定跟目录'/'

## 补充(一个新的脚手架工具)
全局安装[webpack-cli](https://github.com/webpack/webpack-cli)
```
npm install webpack-cli -g
```

作用:
* Creating new webpack projects(交互式创建项目)
* Migration from webpack v1 to v2(升级迁移版本)

## webpack 4 beta
## 总结

1. 编译 打包 hmr 代码分割 文件处理
2. tree shaking es module 动态import
3. scope hoisting(打包以后性能提升)  magic comments
