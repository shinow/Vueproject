import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import tag from './modules/tags'
import common from './modules/common'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    tag,
    common
  },
  // 数据持久化存储在 localStorage 中
  plugins: [createPersistedState()]
})
