import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-cmer/cmer/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}
export const getchannelList = (params) => {
  return request({
    url: '/api/blade-product/channel/list',
    method: 'get',
    params
  })
}

export const getonline = (params) => {
  return request({
    url: '/api/blade-cmer/cmer/online',
    method: 'post',
    params
  })
}


export const getbankMarklList = (params) => {
  return request({
    url: '/api/blade-system/dict-biz/dictionary?code=user_bankMark',
    method: 'get',
    params
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-cmer/cmer/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-cmer/cmer/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-cmer/cmer/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-cmer/cmer/update',
    method: 'post',
    data: row
  })
}

