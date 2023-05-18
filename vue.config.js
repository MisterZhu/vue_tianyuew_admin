const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const Icons = require("unplugin-icons/webpack")
const IconsResolver = require("unplugin-icons/resolver")

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // publicPath:  "./",
  outputDir: 'dist', // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  assetsDir: 'static',
  parallel: false, // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: true, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    proxy: {
      // 配置跨域
      "/api": {
        target: process.env.VUE_APP_BASE_API,
        pathRewrite: { "^/api": "" },
        // ! 开启代理
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    devtool:'source-map',
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
