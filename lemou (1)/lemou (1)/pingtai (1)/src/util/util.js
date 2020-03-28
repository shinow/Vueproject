/**
 * 通过parentId寻找父类
 */

export const findParent = (tree, id) => {
  if (tree && (tree.length != 0)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id == id) {
        return tree[i]
      } else if (tree[i].children && (tree[i].children.length != 0)) {
        for (var j = 0; j < tree[i].children.length; j++) {
          if (tree[i].children[j].id == id) {
            return tree[i].children[j]
          } else if (tree[i].children[j].children && (tree[i].children[j].children.length != 0)) {
            if (findParent(tree[i].children[j].children, id)) {
              return findParent(tree[i].children[j].children, id)
            } else {
              continue
            }
          }
        }
      } else {
        continue
      }
    }
  }
}
export const deleteNull = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].childList) {
      if (arr[i].childList.length == 0) {
        delete arr[i].childList
      } else {
        deleteNull(arr[i].childList)
      }
    } else {
      continue
    }
  }
}
export const deleteNullRegion = (arr) => {
  let newArr = Array.from(new Set(arr)).filter(item => item)
  for (var i = 0; i < newArr.length; i++) {
    if (newArr[i] != null) {
      let arr1 = Array.from(new Set(newArr[i].children)).filter(item => item)
      newArr[i].children = arr1
      for (var j = 0; j < arr1.length; j++) {
        if (arr1[j] != null) {
          let arr2 = Array.from(new Set(arr1[j].children)).filter(item => item)
          arr1[j].children = arr2
        }
      }
    }
  }
  return newArr
}
export const deepQuery = (tree, id) => {
  var isGet = false
  var retNode = null
  function deepSearch (tree, id) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].children && tree[i].children.length > 0) {
        deepSearch(tree[i].children, id)
      }
      if (id === tree[i].id || isGet) {
        isGet || (retNode = tree[i])
        isGet = true
        break
      }
    }
  }
  deepSearch(tree, id)
  return retNode
}
