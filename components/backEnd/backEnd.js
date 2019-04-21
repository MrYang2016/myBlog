const jade = require('jade'),
  Head = require('../head/head'),
  path = require('path');
module.exports = () => {
  let text = jade.compileFile(path.join(__dirname + '/backEnd.jade'));
  return Head({
    title: '后台',
    headContent: text(),
    jsArr: ['/js/showdown.min.js','/js/showdown-table.min.js', '/js/backEnd.js'],
    myStyle: ['/css/markdown.css']
  });
};