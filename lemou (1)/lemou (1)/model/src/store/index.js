import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// import state from './state'
import createPersistedState from "vuex-persistedstate"
const store = new Vuex.Store({
  state:{
  },
  plugins: [createPersistedState()]
})
export default store;