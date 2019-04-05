const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const heapdump = require('heapdump');
heapdump.writeSnapshot(path.resolve(__dirname + '/log/data' + Date.now() + '.heapsnapshot'));

const pageRouter = require('./pageRouter');
const backendApi = require('./interface/backend');

//连接数据库
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:21018/blog', { useNewUrlParser: true });
mongoose.connection.on('error', console.log.bind(console, 'connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(pageRouter);
app.use(backendApi);
app.use('/', express.static(path.join(__dirname + '/static')));
app.set('port', 8100);
app.listen(app.get('port'), err => {
  if (err) throw err;
  console.log('server connect in http://localhost:' + app.get('port'));
});
