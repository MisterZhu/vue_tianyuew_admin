import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
// import { ElLoading, ElMessage } from 'element-plus';
// import { ElLoading } from 'element-plus';
// import { ElMessage } from 'element-plus'


let loading: any;

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
  const tokenValue = localStorage.getItem('msToken');
  if (tokenValue) {
    // 将 token 设置到请求头中，以便后端进行鉴权
    Service.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
  }
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
  // 错误提醒
  return Promise.reject(error);
})

export default Service;