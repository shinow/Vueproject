import router from '@/router'
import {userMenu, login} from '@/api'
import {deleteNull} from '@/util/util'
import {Message} from 'element-ui'
export default {
  state: {
    isCollapse: false,
    userMenu: []
  },
  actions: {
    LoginByUsername ({dispatch, state, commit}, loginInfo) {
      login(loginInfo).then((res) => {
        console.log(res)
        if (res.data.httpCode == 0) {
          commit('DEL_ALL_TAG', { root: true })
          router.push({path: '/index'})
          dispatch('GetMenuList')
        } else if (res.data.httpCode == 100111) {
          Message({
            message: '此账号已被停用',
            type: 'warning'
          })
        }
      })
    },
    GetMenuList ({commit}) {
      userMenu({parentId: 0}).then((res) => {
        const menuData = res.data.data[0].childList
        deleteNull(menuData)
        commit('SET_MENU', menuData)
      })
    }
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse
    },
    SET_MENU: (state, action) => {
      state.userMenu = action
    }
  }
}
