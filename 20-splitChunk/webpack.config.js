const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index: __dirname + '/src/index.js',
    admin: __dirname + '/src/admin.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['babel-preset-env', {
              targets: {
                browsers: ['>1%', 'last 2 versions']
              }
            }]
          ]
        }
      },
      exclude: '/node_modules/'
    }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      // minSize: 1000
      cacheGroups: {
        commons: {
          name: "commons",
          priority: 200,
          // chunks: "all",
          minChunks: 2,
        },
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: "vendor",
        //   chunks: "all",
        //   priority: 5
        // },
        vue: {
          test: /[\\/]node_modules[\\/]vue[\\/]/,
          name: "vue",
          // chunks: "all",
          priority: 100
        },
        lodash: {
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: "lodash",
          // chunks: "all",
          priority: 500
        },
        'element-ui': {
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          name: "element-ui",
          priority: 100
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['manifest','index','commons.chunk','vue'],
      template: path.resolve(__dirname, './template.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      chunks: ['manifest','admin','commons','lodash'],
      template: path.resolve(__dirname, './template.html')
    }),
  ]
}