const tagObj = {
  label: '',
  value: '',
  query: '',
  num: '',
  close: true
}
// const getStore = (namespace, name) => {
//   return JSON.parse(window.sessionStorage.getItem('vuex').namespace.name)
// }
function setFistTag (list) {
  if (list.length == 1) {
    list[0].close = false
  } else {
    list.some(a => {
      a.close = true
    })
  }
  return list
}
export default {
  state: {
    tagList: [],
    tag: tagObj,
    tagIndex: {
      label: '首页',
      value: '/index',
      close: false
    },
    tagCurrent: []
  },
  mutations: {
    ADD_TAG: (state, action) => {
      state.tagCurrent = action
      let isHave = state.tagList.some((item) => item.value === action.value)
      if (!isHave) {
        state.tagList.map((item) => {
          item.close = false
        })
        action.close = true
        state.tagList = [...state.tagList, action]
      } else {
        state.tagList.map((item) => {
          item.close = false
          if (item.value === action.value) {
            item.close = true
          }
        })
      }
    },
    DEL_TAG: (state, action) => {
      state.tagList.forEach((ele, num) => {
        if (ele.value === action.value) {
          state.tagList.splice(num, 1)
          state.tagList = setFistTag(state.tagList)
        }
      })
    },
    DEL_TAG_OTHER: (state, action) => {
      console.log(state)
      state.tagList.forEach((ele, num) => {
        if (ele.value === state.tagCurrent.value) {
          state.tagList = state.tagList.slice(num, num + 1)
          state.tag = state.tagList[0]
          state.tagList[0].close = true
        }
      })
      state.tagList = [state.tagIndex, ...state.tagList]
    },
    DEL_ALL_TAG: (state, action) => {
      state.tagList = []
      state.tagIndex.close = true
      state.tagList.push(state.tagIndex)
    }
  }
}
