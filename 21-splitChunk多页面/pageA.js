var vue = require('vue');
var utility1 = require('./utility1');
var utility2 = require('./utility2');
new Vue()

import(/* webpackChunkName: "common-async.js" */"./common-async").then(common => {
  console.log(common);
})

module.exports = "pageA";
