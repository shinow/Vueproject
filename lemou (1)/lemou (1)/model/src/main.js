// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
// import * as utils from '@/utils'
// Vue.use(utils)
// for (let i in utils) {
//   Vue.use(utils[i])
// }
import jquery from 'jquery'
window.jquery = window.$ = jquery

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import ECharts from 'vue-echarts/components/ECharts'
require('echarts');//引入所有表
import touch from 'vue-directive-touch';
import VueTouch from 'vue-touch'

Vue.prototype.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.component('chart', ECharts)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI)
Vue.use(Vant);
Vue.use(touch);
Vue.use(Vuex)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
