module.exports = "a";

import(/* webpackChunkName: "c.js" */"./c").then(c => {
  console.log(c);
})
