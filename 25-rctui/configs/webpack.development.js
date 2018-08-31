const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            // 开启了CSS Module功能，避免类名冲突问题
            options: {
              modules: true,
              localIdentName: '[name]-[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  devServer: {
    port: '1234',
    before(app) {
      app.get('/api/test.json', function(req, res) {
        res.json({ code: 200, message: 'hello world' });
      });
    }
  }
});

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true)
  })
);

module.exports = config;
