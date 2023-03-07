import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { HttpService } from './api/userapi'
import server from './api'
import axios from './http'
import '@/styles/index.scss'

const app = createApp(App)
// ? 全局挂载 axios
app.provide('server', server)
app.provide('axios', axios)

app.use(store)
app.use(router)
app.mount('#app')

// const serve = new HttpService()
// app.config.globalProperties.$serve = serve;
