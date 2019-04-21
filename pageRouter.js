const express = require('express');
const router = express.Router();

const About = require('./components/about/about');
const Contact = require('./components/contact/contact');
// const BackEnd = require('./components/backEnd/backEnd');
const Index = require('./components/index/index');
const DocHtml = require('./components/doc/doc');

const Doc = require('./schema/doc');

router.get('/', async (req, res) => {
  const text = await Index();
  res.send(text);
});
router.get('/about', (req, res) => {
  res.send(About());
});
router.get('/contact', (req, res) => {
  res.send(Contact());
});
// router.get('/backend', (req, res) => {
//   res.send(BackEnd());
// });
router.get('/docs/*', async (req, res) => {
  let docName = req.params[0];
  const result = await Doc.find({ hashName: docName });
  if (!result || !result.length) return res.json({ state: true, msg: '找不到对应的文章' });
  const { fileName, content, time, ips } = result[0];
  const [prevDoc, nextDoc] = await Promise.all([
    Doc.find({ time: { $lt: time } }).limit(1).sort({ time: -1 }),
    Doc.find({ time: { $gt: time } }).limit(1).sort({ time: 1 }),
  ]);
  const ip = getIP(req);
  if (ips.indexOf(ip) === -1) {
    ips.push(ip);
    await Doc.findOneAndUpdate({ hashName: docName }, { ips: ips });
  }
  const html = DocHtml({
    fileName,
    content,
    prevDoc,
    nextDoc,
    visitorNum: ips.length,
  });
  res.send(html);
});

module.exports = router;

function getIP(req) {
  return (req.headers && (req.headers['x-real-ip'] || req.headers['x-forwarded-for'])) ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.ip;
}