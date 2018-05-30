var path = require("path");

module.exports = {
  // mode: "development" || "production",
  entry: {
    pageA: "./pageA", // 引用utility1.js  utility2.js
    pageB: "./pageB", // 引用utility2.js  utility3.js
    pageC: "./pageC",  // 引用utility2.js  utility3.js,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0,// This is example is too small to create commons chunks,
        },
        'vendor-pageA': {
          test: /vue|element-ui/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "vendor-pageA",
          enforce: true,
        },
        'vendor-pageB': {
          test: /react/, // 直接使用 test 来做路径匹配
          chunks: "initial",
          name: "vendor-pageB",
          enforce: true,
        },
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  }
};
