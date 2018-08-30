const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
module.exports = {
  entry: __dirname + '/src/index.tsx',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  // mode: 'development',
  mode: 'development',
  resolve: {
    // 一定不要忘记配置ts tsx后缀
    extensions: ['.tsx', '.ts', '.js']
  }
  // plugins: [new BundleAnalyzerPlugin()]
};
