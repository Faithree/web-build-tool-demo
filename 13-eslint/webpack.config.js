const webpack = require('webpack')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    index: __dirname + '/src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  devtool: 'eval',
  devServer: {
    // inline: false,
    port: 8090,
    overlay:true,
    proxy: {
      // 这里举例一个本地服务器的地址或者局域网内的地址
      '/api': {
        target: 'http://172.16.186.20:3000',
        host: 'http://localhost:8000',
        loglevel: 'debug', // 代理信息
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        },
        headers: {
          // 一般用不上，主要用于未作登陆页面的测试页面
          // 伪造浏览器请求
          'Cookie': ''
        }
      }
    },
    historyApiFallback: {
      // 本质是connectHistoryApiFallback
      rewrites: [
        // 可以使用正则
        {
          from: '/example/index',
          to: '/index.html'
        }
      ]
    },
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:['env']
            }
          },
          {
            loader:'eslint-loader',
            options:{
              formatter:require('eslint-friendly-formatter')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            /* options: {
               insertInto: 'body',//插入到哪个dom上面
               singletom: true, // 把所有的style合成一个
               transform: './css.transform.js' // 类似钩子，发生在浏览器环境，可以根据浏览器环境不同做出不同的兼容，例如做media query
             }*/
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,// 开启压缩
              // module: true// 模块化
            },
            // loader: 'file-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // require('autoprefixer')(),
                // require('cssnano')(),
                // require('postcss-cssnext')()
              ]
            }
          },]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].min.[ext]',
            limit: 5000,
            publicPath: '/img/',
            outputPath: 'img/',
            // useRelativePath: true
          }
        },
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
                  {removeTitle: true},
                  {convertPathData: false}
                ]
              }
            }
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //       require('postcss-sprites')({
          //         spritePath: 'dist/img/sprites',
          //         retina: true
          //       })
          //     ]
          //   }
          // }
        ]
      },
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
    ]
  },
  plugins: [
    // new ExtractTextPlugin("[name].[contenthash:8].css"),
    new extractTextWebpackPlugin({
      filename: 'css/[name].[hash].min.css',
      allChunks: false // 制定提取css的范围,提取初始化（非异步加载）,此时在commonChunk插件下，css也会被当成一个chunk,所有要用contenthash
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}