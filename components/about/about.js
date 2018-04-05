const jade = require('jade'),
    Nav = require('../nav/nav'),
    path = require('path');
module.exports = () => {
    let text = jade.compileFile(path.join(__dirname + '/about.jade'));
    return Nav({
        title: '关于羊锡贵',
        content: text(),
        type:1
    })
};