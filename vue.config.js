const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const Icons = require("unplugin-icons/webpack")
const IconsResolver = require("unplugin-icons/resolver")

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
        target: "http://106.52.86.134:8087/api/",
        pathRewrite: { "^/api": "" },
        // ! 开启代理
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ["vue"],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'i',
          }),
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
        ],
      }),
      Icons({
        autoInstall: true,
      }),
    ],
  }
})
