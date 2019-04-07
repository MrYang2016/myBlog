const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

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

app.use(pageRouter);
app.use(backendApi);
// 静态资源
app.use('/', express.static(path.join(__dirname + '/static')));
// 管理后台
// app.use('/backend', express.static(path.join(__dirname + '/backend/dist')));
// demo
app.use('/demo', express.static(path.join(__dirname + '/demo')));
app.listen(process.env.PORT || 8100, err => {
  if (err) throw err;
  console.log('server connect in http://localhost:' + process.env.PORT || 8100);
});
