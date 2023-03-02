const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/login-page/" : "/",
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: "http://127.0.0.1:8087/api/",
        pathRewrite: { "^/api": "" },
        // ! 开启代理
        changeOrigin: true,
      },
    },
  },
})
