module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: './dist/bundle.js'
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
                browsers:['>1%','last 2 versions']
              }
            }]
          ]
        }
      },
      exclude: '/node_modules/'
    }]
  }
}