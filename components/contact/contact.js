const jade = require('jade'),
  Nav = require('../nav/nav'),
  path = require('path');
module.exports = () => {
  let text = jade.compileFile(path.join(__dirname + '/contact.jade'));
  return Nav({
    title: '联系羊锡贵',
    content: text(),
    type: 2
  });
};