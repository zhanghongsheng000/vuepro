import axios from 'axios'
import queryString from 'queryString'
let $zjyfhttp = axios.create({
  baseURL: 'http://api.jiatob.com/',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    return queryString.stringify(data)
  }]
})
export default $zjyfhttp
