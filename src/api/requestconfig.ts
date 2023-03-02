import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus'


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
  baseURL:'/api/v1',
  // headers:{
  //     'Content-Type':"application/json;charset=UTF-8"
  // },
  timeout:10000
})
// 请求拦截
Service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 加载
  startLoading();
  // config.headers.common['Authorization']=window.sessionStorage.getItem('token')===null?null:window.sessionStorage.getItem('token')
  return config;
})


// 响应拦截
Service.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();
  const res = response.data
  if (res.code === 200) {
    return res;
  }else{
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