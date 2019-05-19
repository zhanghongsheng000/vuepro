// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/public.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $http from '@/assets/js/http';
import $zjyfhttp from '@/assets/js/zjyfhttp';
import $httpPasser from '@/assets/js/httpPasser';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$httpPasser = $httpPasser
Vue.prototype.$http = $http
Vue.prototype.$zjyfhttp = $zjyfhttp
import $http2 from '@/assets/js/http2';
Vue.prototype.$http2 = $http2
import Utile from '@/assets/js/utils'
import JJS from '@/plugins/jjsUi'
Vue.use(JJS)
Vue.use(Utile)



Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  router
})
