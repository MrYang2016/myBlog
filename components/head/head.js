const jade = require('jade'),
  path = require('path');
module.exports = obj => {
  let text = jade.compileFile(path.join(__dirname + '/head.jade')),
    sendObj = obj;
  if (!obj.myStyle) sendObj = Object.assign(sendObj, { myStyle: [] });
  if (!obj.jsArr) sendObj = Object.assign(sendObj, { jsArr: [] });
  if (typeof obj.jsArr === 'string') obj.jsArr = [obj.jsArr];
  return text(sendObj);
};