module.exports = {
  publicPath: '/backend/',
  devServer: {
    proxy: 'http://localhost:8100',
  },
  pages: {
    index: {
      entry: 'src/pages/index/index.js',
      template: 'src/pages/index/index.html',
      filename: 'index.html',
      title: '羊锡贵的博客管理后台',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    login: {
      entry: 'src/pages/login/login.js',
      template: 'src/pages/login/login.html',
      filename: 'login.html',
      title: '羊锡贵的博客管理后台登陆',
      chunks: ['chunk-vendors', 'chunk-common', 'login'],
    }
  }
}