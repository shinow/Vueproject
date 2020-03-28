// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/common.less'
import store from './store'
// import './mock'
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
// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(Element)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
