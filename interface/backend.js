const express = require('express');
const router = express.Router();
const md5 = require('js-md5');

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

module.exports = router;