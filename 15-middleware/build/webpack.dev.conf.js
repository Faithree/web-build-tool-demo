const webpack = require('webpack')
const proxy = require('./proxy')
const history = require('./historyApi')

module.exports = {
    devtool: 'cheap-module-source-map',
    devServer: {
        // inline: false,
        port: 8090,
        overlay:true,
        proxy: proxy,
        historyApiFallback: history,
        hot: true,
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}