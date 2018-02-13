const webpack = require('webpack')
module.exports = {
  entry: {
    index: __dirname + '/src/index.js',
    admin: __dirname + '/src/admin.js',
    vendor: ['vue', 'lodash']
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
          ],
          plugins:['syntax-dynamic-import']
        }
      },
      exclude: '/node_modules/'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      children:true,
      minChunks: ({ resource } = {}) => (
        resource&&/commonModule/.test(resource)
      )
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   minChunks: 2,
    //   chunks: ['index', 'admin']
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ]
}