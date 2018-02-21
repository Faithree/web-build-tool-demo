// import './css/reset.less'
// import base from './css/base.css'
require('./css/base.css')
//

var h2Ele = document.createElement('h3')
h2Ele.className = 'border'
var bodyEle = document.querySelector('body')
bodyEle.appendChild(h2Ele)
// document.write('<h2 class="border">乘风gg</h2>')

if (module.hot) {
  console.log(1111111)
  module.hot.accept()
}
