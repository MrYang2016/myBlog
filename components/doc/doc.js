const jade = require('jade');
const Head = require('../head/head');
const path = require('path');
module.exports = ({ fileName, content, prevDoc, nextDoc, visitorNum = 0 }) => {
  let text = jade.compileFile(path.join(__dirname + '/doc.jade'));
  return Head({
    title: fileName,
    headContent: text({
      content,
      prevDoc: prevDoc[0],
      nextDoc: nextDoc[0],
      visitorNum,
    }),
    myStyle: ['/css/markdown.css', './doc']
  });
};