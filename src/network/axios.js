import axios from 'axios'
import qs from 'qs'

import {
  Message
} from 'element-ui'

export default function originAxios(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      // baseURL: 'http://123.207.32.32:8000',
      baseURL : "http://127.0.0.1:8888/api/private/v1",
      timeout: 5000
    });

    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = window.sessionStorage.getItem('token')
      // console.log(window.sessionStorage.getItem('token'))
      // 添加header头的token
      // let token = window.sessionStorage.getItem('token')
      // if (config.token === true) {
      //   config.headers['token'] = token
      // }
      // // 显示loading
      // if (config.loading === true) {
      //   showLoading()
      // }
      // 在发送请求之前做些什么
      return config;
    }, (error) => {
      // 隐藏loading
      hideLoading()
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use((response) => {
      console.log('进入成功响应拦截器');
      // 隐藏loading
      // hideLoading()
      // 对响应数据做点什么
      return response;
    }, (err) => {
      console.log('进入错误响应拦截器');
      // 全局错误提示
      if (err.response && err.response.data && err.response.data.errorCode) {
        Message.error(err.response.data.msg)
      }
      // 隐藏loading
      hideLoading()
      // 对响应错误做点什么
      return Promise.reject(err);
    });


    // 2.传入对象进行网络请求
    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
