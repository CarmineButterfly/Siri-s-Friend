const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    hot:true,
    open:true,
    port: 8080,
    host:'localhost',
    proxy: {
      'api': {
        //配置代理服务器
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
      }
    }
  }
})
