const Nav = require('../nav/nav'),
    path = require('path'),
    Doc = require('../../schema/doc'),
    getDate = require('../../common/js/getDate'),
    jade = require('jade');
module.exports = () => {
    let text = jade.compileFile(path.join(__dirname + '/index.jade'));
    return new Promise((resolve, reject) => {
        Doc.find({}, (err, data) => {
            let d = data.sort((a,b)=>(b.time - a.time));
            if (err) return reject(err);
            d.map(val => {
                val.time = getDate(val.time);
                val.originalname = val.originalname.match(/[^.]*/)[0]
            });
            resolve(Nav({
                title: '羊锡贵的博客',
                content: text({docArr: d}),
                style: ['/css/index.css'],
                type: 0
            }));
        });
    });
};