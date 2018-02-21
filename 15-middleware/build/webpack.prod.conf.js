const webpack = require('webpack')
const cleam = require('clean-webpack-plugin')
module.exports = {
    plugins: [
        new cleam(['dist']),
        new webpack.optimize.UglifyJsPlugin(),
    ]
}