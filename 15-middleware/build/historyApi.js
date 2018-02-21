module.exports = {
  // 本质是connectHistoryApiFallback
  rewrites: [
    // 可以使用正则
    {
      from: '/example/index',
      to: '/index.html'
    }
  ]
}