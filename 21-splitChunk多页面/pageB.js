var react = require('react');
var reactDom = require('react-dom');
var utility2 = require('./utility2');
var utility3 = require('./utility3');
import(/* webpackChunkName: "common-async.js" */"./common-async").then(common => {
  console.log(common);
})
module.exports = "pageB";
