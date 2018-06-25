import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.withCredentials = true;
//设置默认请求头
// axios.defaults.headers = {
  // 当自定义了header时，会出现options请求
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'Content-Type': 'application/x-www-form-urlencoded'
// }
axios.defaults.timeout = 10000

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器

axios.interceptors.request.use(config => {
  //发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }

  return config

}, error => {
  return Promise.reject(error)
})

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  // console.log('[response]',response)
  let data = response.data;
  // 根据返回的code值来做不同的处理
  // console.log(data.code);
  switch (data.code) {
    case 99999: // 登录状态相关的代码
      // console.log('需要登录');
      store.commit('needSignin',true);
      return response

    case 200:
      return response;
      // break;
    default:
      if(response.status == 200){
        return response
      }

      // 若不是正确的返回code,就抛出错误
      const error = new Error(data.msg)
      return Promise.reject(error)
  }

}, error => {
  // console.log(error.response.status)

  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = "连接到服务器失败"
  }
  // console.log(error);
  return Promise.reject(error)
})

export default {
  //get请求
  get(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url:url,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch((error) => {
        reject(error);
      })
    })
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url:url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      })
    })
  },
  // put请求
  put(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url:url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      })
    })
  },
  // delete请求
  delete(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url:url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      })
    })
  },
}