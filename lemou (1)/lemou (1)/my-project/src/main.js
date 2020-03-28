// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
// import HAlipay from ''
import * as utils from '@/utils'
Vue.use(utils)
for (let i in utils) {
  Vue.use(utils[i])
}
import axios from 'axios'
import {
  Loading
} from 'vant';
import Vant from 'vant';
import {
  Stepper
} from 'vant';
import {
  AddressEdit
} from 'vant';
import {
  CountDown
} from 'vant';
import {
  Tab,
  Tabs
} from 'vant';
import {
  Overlay
} from 'vant';
import {
  Dialog
} from 'vant';
import {
  Switch
} from 'vant';
import {
  Uploader
} from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Icon
} from 'vant';
import {
  Area
} from 'vant';
import {
  Toast
} from 'vant';
import VueClipboard from 'vue-clipboard2'
import { PullRefresh } from 'vant';
import { Progress } from 'vant';
import { Swipe, SwipeItem } from 'vant';


// 引入echarts
import 'echarts/lib/chart/line'
import ECharts from 'vue-echarts'
import 'echarts/lib/component/legend'//图例
import 'echarts/lib/component/tooltip'//鼠标悬停
//import 'echarts/lib/component/polar'
import 'echarts/lib/component/title.js'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie' //饼图
import 'echarts/lib/chart/sunburst'
Vue.component('chart', ECharts)
Vue.config.productionTip = false
Vue.prototype.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'




Vue.use(Vant);
Vue.use(Vuex)
Vue.use(Switch);
Vue.use(Stepper);
Vue.use(AddressEdit);
Vue.use(CountDown);
Vue.use(Tab).use(Tabs);
Vue.use(Overlay);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Uploader);
Vue.use(ElementUI)
Vue.use(Icon);
Vue.use(Area);
Vue.use(VueClipboard)
Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(Progress);
Vue.use(Swipe).use(SwipeItem);
/* eslint-disable no-new */
new Vue({
  // Axios,
  store,
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
