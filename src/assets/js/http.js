import axios from 'axios'
import router from '@/router/index'
import queryString from 'queryString'
import gUrl from '@/assets/js/gUrl'
import {$local} from '@/assets/js/utils'

let $http = axios.create({
  baseURL: gUrl,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    return queryString.stringify(data)
  }]
})
// 请求拦截器
$http.interceptors.request.use(
  function (config) {
    if ($local.sefetch('info').token) {
      config.headers.token = $local.sefetch('info').token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  }
)


$http.interceptors.response.use(
  function (response) {// 对响应数据做点什么
    if (response.data.resultCode === 433) {
      router.push({path: '/'})
    }
    return response;
  },
  function (err) {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          err.message = '未授权，请重新登录(401)';
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败!'
    }
    return Promise.reject(err);
  }
)
export default $http
