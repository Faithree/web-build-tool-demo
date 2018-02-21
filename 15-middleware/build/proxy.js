module.exports = {
  // 这里举例一个本地服务器的地址或者局域网内的地址
  '/api': {
    target: 'http://172.16.186.20:3000',
    host: 'http://localhost:8000',
    loglevel: 'debug', // 代理信息
    changeOrigin: true,
    pathRewrite: {
      '/api': ''
    },
    headers: {
      // 一般用不上，主要用于未作登陆页面的测试页面
      // 伪造浏览器请求
      'Cookie': ''
    }
  }
}