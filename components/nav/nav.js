const Head = require('../head/head'),
  path = require('path'),
  jade = require('jade');
module.exports = obj => {
  let text = jade.compileFile(path.join(__dirname + '/nav.jade')),
    myStyle = ['/css/nav.css'];
  if (obj.style) myStyle = myStyle.concat(obj.style);
  return Head(Object.assign(obj, {
    headContent: text(obj),
    myStyle: myStyle
  }));
};