import axios from 'axios';
// import Base64 from './base64.js';

// let base64 = new Base64();//加密


// 发送请求后，5秒没有收到请求回复，就会超时报错
axios.defaults.timeout = 5000
// 接口统一前缀名  在生产环境和开发环境切换时需手动更改
axios.defaults.baseURL = 'http://42.193.106.104:8888/'

// 两个拦截器根据需要，自行添加

// //http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );


// //http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if (response.data.errCode == 2) {
//       router.push({
//         path: "/A",
//         querry: {
//           redirect: router.currentRoute.fullPath
//         } //从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(data) {
  return new Promise((resolve, reject) => {
    // if(data.data != undefined){
    //   var mydata = base64.encode(JSON.stringify(data.data));
    //   console.log(mydata);
    // }else{
    //   var  mydata = {}
    // }
    axios.get(
        data.url,
        mydata || {},
        data.headers || {
          'Content-Type': 'application/json',
        }
      )
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(data) {
  return new Promise((resolve, reject) => {
    axios.post(
        data.url,
        data.data || {},
        data.headers || {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      )
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}


/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}