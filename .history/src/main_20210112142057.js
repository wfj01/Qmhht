// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import qs from 'qs';
import Element  from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, { size: 'small', zIndex: 3000 });
import {
  post,
  get,
  patch,
  put
} from '@/api/index.js'
Vue.prototype.$axios = axios;
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.qs = qs //全局注册，使用方法为:this.qs
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
