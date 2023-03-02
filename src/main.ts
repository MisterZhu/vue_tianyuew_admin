import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { HttpService } from './api/userapi'
import server from './api'

const app = createApp(App)
// ? 全局挂载 axios
app.provide('server', server)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

// const serve = new HttpService()
// app.config.globalProperties.$serve = serve;
