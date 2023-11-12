import { createApp } from 'vue'
import { useRoute } from 'vue-router'

import App from './App.vue'
import router from './router'
import store from './store'
import server from './api'
// import axios from './http'
import '@/styles/index.scss'
import request from "./api/requestconfig";

const tokenValue = localStorage.getItem('local_token')
if (tokenValue) {
    request.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;

}

const app = createApp(App)
// ? 全局挂载 axios,server
app.provide('server', server)
// app.config.globalProperties.$axios = axios
// app.use(AxiosPlugin)

app.use(store)
app.use(router)
app.use(useRoute)
app.mount('#app')

// const serve = new HttpService()
// app.config.globalProperties.$serve = serve;
