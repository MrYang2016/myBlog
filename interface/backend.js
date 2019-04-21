const express = require('express');
const router = express.Router();
const md5 = require('js-md5');
const uuidv3 = require('uuid/v3');
const { checkDataType, portResult } = require('../common/js/common');

const Doc = require('../schema/doc');

// 上传文章内容
router.post('/backend/api/uploaddoc', (req, res) => {
  const data = req.body;
  const checkResult = checkDataType(data, {
    fileName: 'string',
    fileIntro: 'string',
    html: 'string',
    markdown: 'string',
    hashName: {
      type: 'string',
      required: false,
    }
  });
  if (checkResult.status === 'fail') return res.json(checkResult);
  const { fileName, fileIntro, html, markdown } = data || {};

  const hashName = data.hashName || md5(`docForYangfileName${fileName}fileIntro${fileIntro}html${html}docForYang`);

  const setData = {
    time: Date.now(),
    hashName,
    fileName,
    intro: fileIntro,
    content: html,
    markdown,
  };

  Doc.findOneAndUpdate(
    { hashName },
    setData,
    { upsert: true }
  )
    .then(() => res.json(portResult.success('上传成功', { hashName })))
    .catch(err => res.json(portResult.fail('上传失败', err)));
});

// 管理后台登陆接口
router.post('/backend/login', (req, res) => {
  const userData = { password: 'yxgweb6622307', account: 'yangxigui' };
  const data = req.body;
  const checkResult = checkDataType(data, {
    'account': 'string',
    'password': 'string',
  });
  if (checkResult.status === 'fail') return res.json(checkResult);

  const uuidNamespace = uuidv3('http://www.yxgweb.com/backend', uuidv3.URL);
  const uuidForPassword = uuidv3(JSON.stringify(userData), uuidNamespace);
  const portPassword = uuidv3(JSON.stringify(data), uuidNamespace);
  if (uuidForPassword === portPassword) {
    res.cookie('userid', portPassword);
    router.userid = portPassword;
    res.json(portResult.success('登陆成功', portPassword));
  } else {
    res.json(portResult.fail('登陆失败，账号或密码错误'));
  }
});

// 获取文章列表
router.get('/backend/api/getDocList', async (req, res) => {
  const data = req.query;
  const checkResult = checkDataType(data, {
    page: {
      type: 'number',
      required: false,
    },
    size: {
      type: 'number',
      required: false,
    }
  });
  if (checkResult.status === 'fail') return res.json(checkResult);

  const { page = 1, size = 10 } = data;
  const getListPro = Doc.find({}, { fileName: 1, time: 1, hashName: 1, _id: 0 })
    .limit(parseInt(size))
    .skip((page - 1) * size)
    .sort({ time: -1 });
  const [docList, count] = await Promise.all([getListPro, Doc.countDocuments()]);
  res.json(portResult.success('请求成功', { docList, count, page, size }));
});

// 获取文章详情
router.get('/backend/api/getDocDetail', async (req, res) => {
  const data = req.query;
  const checkResult = checkDataType(data, { hashName: 'string' });
  if (checkResult.status === 'fail') return res.json(checkResult);

  const { hashName } = data;
  const result = await Doc.find({ hashName }, { _id: 0 });
  res.json(portResult.success('请求成功', result[0] || null));
});

// 删除文章
router.post('/backend/api/deleteDoc', async (req, res) => {
  const data = req.body;
  const checkResult = checkDataType(data, { hashName: 'string' });
  if (checkResult.status === 'fail') return res.json(checkResult);

  const result = await Doc.findOneAndDelete({ hashName: data.hashName });
  res.json(result ? portResult.success('删除成功') : portResult.fail('删除失败'));
});

// 根据文章名称查找
router.get('/backend/api/findDocListUseName', async (req, res) => {
  const data = req.query;
  const checkResult = checkDataType(data, { fileName: 'string' });
  if (checkResult.status === 'fail') return res.json(checkResult);

  const reg = new RegExp(data.fileName, 'g');
  const result = await Doc.find(
    { fileName: reg },
    { fileName: 1, time: 1, hashName: 1, _id: 0 }
  );
  res.json(portResult.success('请求成功', result));
});

module.exports = router;
