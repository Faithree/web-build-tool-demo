const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const app = express()
const port = 3001
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const config = require('./webpack.base.conf')('development')
const proxyTable = require('./proxy')
const historyApi = require('./historyApi')
const compiler = webpack(config)

for (let context in proxyTable) {
  app.use(proxyMiddleware(context, proxyTable[context]))
}

app.use(historyApiFallback(historyApi))
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

app.listen(port, function () {
  console.log('success')
  opn('http://localhost:' + port)
})
