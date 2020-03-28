import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-user/useraccount/page',
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
    url: '/api/blade-user/useraccount/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const update = (params) => {
  return request({
    url: '/api/blade-user/useraccount/update',
    method: 'post',
    params
  })
}

