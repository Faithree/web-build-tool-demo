let path = require('path')
module.exports = {
  // mode: "development || "production",
  entry: {
    pageA: "./a", //
    pageB: "./b", //
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0 // This example is too small, in practice you can use the defaults
    },
    occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js"
  }
};
