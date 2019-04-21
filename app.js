const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const pageRouter = require('./pageRouter');
const backendApi = require('./interface/backend');

//连接数据库
const dbPort = process.env.NODE_ENV === 'development' ? 27017 : 21018;
mongoose.connect(
  `mongodb://localhost:${dbPort}/blog`,
  { useNewUrlParser: true }
);
mongoose.connection.on('error', console.log.bind(console, 'connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('*', (req, res, next) => {
  // 进入管理后台时，检查cookie，判断是否已登陆
  const baseUrl = req.baseUrl;
  if (
    (
      baseUrl === '/backend' || 
      baseUrl.indexOf('/backend/api') > -1
    ) &&
    (
      !req.cookies ||
      !req.cookies.userid ||
      req.cookies.userid !== backendApi.userid
    )
  ) {
    res.redirect('/backend/login.html');
  }
  else next();
});

app.use(pageRouter);
app.use(backendApi);
// 静态资源
app.use('/', express.static(path.join(__dirname + '/static')));
// 管理后台
app.use('/backend/', express.static(path.join(__dirname + '/backend/dist')));
// demo
app.use('/demo', express.static(path.join(__dirname + '/demo')));
app.listen(process.env.PORT || 8100, err => {
  if (err) throw err;
  console.log('server connect in http://localhost:' + process.env.PORT || 8100);
});
