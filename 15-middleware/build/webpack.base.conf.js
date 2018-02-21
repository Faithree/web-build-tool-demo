const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')

const htmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')

const baseConfig = function (env) {

    const scriptLoader = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }].concat(env === 'production'
        ? []
        : [{
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }
        ])
    cssLoader = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: env === 'production' ? false : true,
                minimize: true,// 开启压缩
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: env === 'production' ? false : true,
                ident: 'postcss',
                plugins: [
                    // require('autoprefixer')(),
                    // require('cssnano')(),
                    // require('postcss-cssnext')()
                ]
            }
        }
    ]
    const styleLoader = env === 'production'
        ? extractTextWebpackPlugin.extract({
            fallback:  'style-loader',
            use: cssLoader
        }) : [{
            loader: 'style-loader',
        }].concat(cssLoader)

    return {
        entry: {
            index: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname + '/../dist'),
            publicPath: '/',
            filename: 'bundle.[hash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: scriptLoader
                },
                {
                    test: /\.css$/,
                    use: styleLoader
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
            new extractTextWebpackPlugin({
                filename: 'css/[name].[hash].min.css',
                allChunks: false // 制定提取css的范围,提取初始化（非异步加载）,此时在commonChunk插件下，css也会被当成一个chunk,所有要用contenthash
            }),
            new htmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                inject: true
            })
        ]
    }
}
module.exports = function (env) {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig
    return merge(baseConfig(env), config)
}