import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-cmer/mer/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const RolegetList = (current, size, params) => {
  return request({
    url: '/api/blade-system/role/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getDetail = (id) => {
  return request({
    url: '/api/blade-cmer/mer/detail',
    method: 'get',
    params: {
      id
    }
  })
}


export const updatePassword = (params) => {
  return request({
    url: '/api/blade-cmer/mer/updatePassword',
    method: 'post',
    params
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-cmer/mer/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-cmer/mer/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-cmer/mer/update',
    method: 'post',
    data: row
  })
}

