const express = require('express');
const router = express.Router();
const md5 = require('js-md5');
const uuidv3 = require('uuid/v3');
const { checkDataType, portResult } = require('../common/js/common');

const Doc = require('../schema/doc');

// 上传文章内容
router.post('/api/uploaddoc', (req, res) => {
  const data = req.body;
  const { fileName, fileIntro, html } = data || {};
  if (!(fileName && fileIntro && html)) return res.json({ state: false, msg: '缺少参数' });
  const hashName = md5(`docForYangfileName${fileName}fileIntro${fileIntro}html${html}docForYang`);
  new Doc({
    time: Date.now(),
    hashName,
    fileName,
    intro: fileIntro,
    content: html
  }).save(err => {
    if (err) return res.json({ state: false, msg: err });
    res.json({ state: true, msg: '上传成功' });
  });
});

// 管理后台登陆接口
router.post('/api/login', (req, res) => {
  const paseword = 'yxgweb6622307';
  const data = req.body;
  const checkResult = checkDataType(data, [['password', 'string']]);
  if (checkResult.status === 'fail') return res.json(checkResult);

  const uuidNamespace = uuidv3('http://www.yxgweb.com/backend', uuidv3.URL);
  const uuidForPaseword = uuidv3(paseword, uuidNamespace);
  const portPassword = uuidv3(data.paseword, uuidNamespace);
  uuidForPaseword === portPassword?
    res.json(portResult.success('登陆成功')):
    res.json(portResult.fail('登陆失败，密码错误'));
});

module.exports = router;