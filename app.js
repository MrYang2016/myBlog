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

app.get('/test/study', (req,res) => {
  function getFormTime(time, isGetHour = false) {
    const t = new Date(time);
    const addZero = s => String(s).length === 1 ? `0${s}` : s;
    let result = `${t.getFullYear()}-${addZero(t.getMonth() + 1)}-${addZero(t.getDate())}`;
    if (isGetHour) result += ` ${addZero(t.getHours())}:${addZero(t.getMinutes())}:${addZero(t.getSeconds())}`;
    return result;
  }
  res.json(getFormTime('2019-04-06 23:59:59'));
});

app.use(pageRouter);
app.use(backendApi);
app.use('/', express.static(path.join(__dirname + '/static')));
app.listen(process.env.PORT || 8100, err => {
  if (err) throw err;
  console.log('server connect in http://localhost:' + process.env.PORT || 8100);
});
