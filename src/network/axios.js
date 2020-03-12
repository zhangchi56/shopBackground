import originAxios from 'axios'
import qs from 'qs'

export default function axios(option) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = originAxios.create({

      baseURL: "http://106.54.54.237:8000/api/wh",
      timeout: 5000
    });

    // 配置请求拦截
    instance.interceptors.request.use(config => {
      // console.log('来到了request拦截success中');
      // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

      // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

      // 3.对请求的参数进行序列化(看服务器是否需要序列化)
      // config.data = qs.stringify(config.data)
      // console.log(config);

      // 添加header头的token
      let token = window.sessionStorage.getItem('token')
      if(config.token === true){
        config.headers['token'] = token
      }
      // 显示loading
      if(config.loading === true){
        showLoading()
      }
      // 在发送请求之前做些什么
      return config;
    }, (error)=> {
      // 隐藏loading
      hideLoading()
      // 对请求错误做些什么
      return Promise.reject(error);
    });


    // 配置响应拦截
    instance.interceptors.response.use(response => {
      console.log('响应拦截器 成功');
      // 隐藏loading
      hideLoading()
      // 对响应数据做点什么
      return response;
    },(err)=> {
      // 全局错误提示
      if(err.response && err.response.data && err.response.data.errorCode){
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
