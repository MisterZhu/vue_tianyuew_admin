import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'vue-router';
// import { ElLoading, ElMessage } from 'element-plus';
// import { ElLoading } from 'element-plus';
// import { ElMessage } from 'element-plus'


let loading: any;
let router = useRouter()

const startLoading = () => {

  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}
/*
    要求请求类型'application/x-www-form-urlencoded; charset=UTF-8'
          需要把数据拼接为 data:'属性1=值1&属性2=值2'
    要求请求类型'application/json'
          需要把数据拼接为 data:loginUser
*/
const Service = axios.create({
  baseURL: '/api/v1',
  headers: {
    // FormData格式请求头
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // json格式请求头
    // "Content-Type": "application/json"

  },
  timeout: 10000
})
// 请求拦截
Service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 加载
  startLoading();
  const tokenValue = localStorage.getItem('local_token');
   console.log("请求拦截 token = " + `Bearer ${tokenValue}`)

  if (tokenValue) {
    // 将 token 设置到请求头中，以便后端进行鉴权
    Service.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;

  }
  console.log(config.url)

  return config;
})


// 响应拦截
Service.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();

  const res = response.data
  if (res.code === 200) {
    return res;
  } else {
    ElMessage.error(res.msg || '网络异常');
    return res;
  }
}, error => {
  // 结束loading
  endLoading();
  if (error.response.status === 401) {
    ElMessage.error('登录信息过期，请重新登陆')
    router.push({name: "login"})
    return
  }
  // 错误提醒
  return Promise.reject(error);
})

export default Service;