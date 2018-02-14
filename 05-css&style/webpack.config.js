const webpack = require('webpack')

module.exports = {
  entry: {
    index: __dirname + '/src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
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
            module: true// 模块化
          }
          // loader: 'file-loader',
        }
      ],
      exclude: '/node_modules/'
    },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }]
      }]
  }
}