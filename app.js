const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    upload = multer({dest: 'docs/'}),
    Doc = require('./schema/doc'),
    fs = require('fs'),
    About = require('./components/about/about'),
    Contact = require('./components/contact/contact'),
    BackEnd = require('./components/backEnd/backEnd'),
    Index = require('./components/index/index');


//连接数据库
mongoose.connect('mongodb://localhost:27017/blog');
mongoose.connection.on('error', console.log.bind(console, 'connection error:'));


app.get('/', (req, res) => Index().then(text => res.send(text)));
app.get('/about', (req, res) => res.send(About()));
app.get('/contact', (req, res) => res.send(Contact()));
app.get('/backend', (req, res) => res.send(BackEnd()));
app.get('/docs/*', (req, res) => {
    let docName = req.params[0];
    fs.readFile('./docs/' + docName, (err, data) => {
        if (err) return res.json({state: false, msg: err});
        let doc = data.toString();
        doc = doc.replace('<body>', '<body><a href="/" style="position: fixed;top: 20px;left: 30px;padding:5px;background-color: #ebebeb;border-radius: 2px;color: #555;font-size: 15px;text-decoration: none;">返回首页</a>');
        res.send(doc);
    });
});


//上传文章
app.post('/api/getFile', upload.single('doc'), (req, res) => {
    if (!req.file) return res.json({state: false, msg: '文件不存在'});
    let file = req.file;
    new Doc({
        time: new Date().getTime(),
        originalname: file.originalname,
        filename: file.filename,
        intro: (req.body && req.body.intro) || ''
    }).save(err => {
        if (err) return res.json({state: false, msg: err});
        res.json({state: true, msg: '上传成功'});
    });
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname + '/static')));
app.set('port', 8200);

app.get('*',(req,res)=>{
    res.send('404');
});

app.listen(app.get('port'), err => {
    if (err) throw err;
    console.log('server connect in http://localhost:' + app.get('port'));
});
