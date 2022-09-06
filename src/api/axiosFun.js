import axios from 'axios';
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    // //   config.headers['Authorization'] = 'Bearer ' + getToken()
    // }
    // return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {alert(222)
    console.log(response)
    const res = response.data
    if (res) {
      res.response_headers = response.headers || {}
    }
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      Message({
        message: res.mesg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.response.data.mesg||error.response.data,
      type: 'error',
      duration: 5 * 1000
    })
    if (error.response.status == '401' && window.location.href.indexOf('/login')==-1) {
      // to re-login
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      })
    }
    return Promise.reject(error)
  }
)

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
        },
        data: params,
        traditional: true,
        // transformRequest: [
        //     function(data) {
        //         let ret = ''
        //         for (let it in data) {
        //             ret +=
        //                 encodeURIComponent(it) +
        //                 '=' +
        //                 encodeURIComponent(data[it]) +
        //                 '&'
        //         }
        //         return ret
        //     }
        // ]
    }).then(res => res.data);
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            // token: localStorage.getItem('logintoken')
        },
        data: params,
        traditional: true,
        // transformRequest: [
        //     function(data) {
        //         let ret = ''
        //         for (let it in data) {
        //             ret +=
        //                 encodeURIComponent(it) +
        //                 '=' +
        //                 encodeURIComponent(data[it]) +
        //                 '&'
        //         }
        //         return ret
        //     }
        // ]
    }).then(res => { if(res.data.code == 401){localStorage.setItem("userInfo", "");window.location.href = '/';return;}; return res.data});
};
//document.location.hostname+document.location.port
const exportExcelInterface = (params, fileName, url) =>{
  return axios({
    method: 'post',
    url,
    data: params,
    responseType: 'blob'
  }).then(res => {
    const blob = new Blob([res.data], {
      type: 'application/octet-stream;charset=UTF-8'
    })

    var downloadUrl = window.URL.createObjectURL(blob)
    var anchor = document.createElement('a')
    anchor.href = downloadUrl
    anchor.download = fileName + '.xls'
    anchor.click()
    window.URL.revokeObjectURL(blob)
  })
}

export {
    loginreq,
    req,
    service,
    exportExcelInterface,
}