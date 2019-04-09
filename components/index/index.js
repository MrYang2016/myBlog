const Nav = require('../nav/nav');
const path = require('path');
const Doc = require('../../schema/doc');
const {getDate} = require('../../common/js/common');
const jade = require('jade');
module.exports = () => {
  let text = jade.compileFile(path.join(__dirname + '/index.jade'));
  return Doc.find().then(data => {
    let d = data.sort((a, b) => (b.time - a.time));
    d.map(val => {
      val.time = getDate(val.time);
    });
    return Nav({
      title: '羊锡贵的博客',
      content: text({ docArr: d }),
      style: ['/css/index.css'],
      type: 0,
    });
  });
};