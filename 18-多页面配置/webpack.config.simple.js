const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const ExtractTextWebpack = require('extract-text-webpack-plugin')
const path = require('path')

const baseConfig = {
  entry: {
    lodash: 'lodash'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].[chunkhash].bundle.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextWebpack.extract({
        fallback: {
          loader: 'style-loader',
        },
        use: {
          loader: 'css-loader',
          options: {
            minimize: true,// 开启压缩
            module: true// 模块化
          }
        }
      })
    }]
  },
  plugins: [
    new CleanWebpack(path.join(__dirname, 'dist')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lodash',
      minChunks: Infinity
    }),
    new ExtractTextWebpack({
      filename:'css/[name].[contenthash].css'
    })
  ]
}


const generatePage = function ({title = '', entry = '', template = './index.html', name = '', chunks = []} = {}) {
  return {
    entry,
    plugins: [new HtmlWebpackPlugin({
      template,
      chunks,
      title,
      filename: name + '.html'
    })]
  }
}


const pages = [
  generatePage({
    title: 'page A',
    entry: {
      a: './src/pages/a'
    },
    name: 'a',
    chunks: ['lodash', 'a']
  }),
  generatePage({
    title: 'page B',
    entry: {
      b: './src/pages/b'
    },
    name: 'b',
    chunks: ['lodash', 'b']
  }),
  generatePage({
    title: 'page C',
    entry: {
      c: './src/pages/c'
    },
    name: 'c',
    chunks: ['lodash', 'c']
  })
]
console.log(merge([baseConfig].concat(pages)))
module.exports = merge([baseConfig].concat(pages))
