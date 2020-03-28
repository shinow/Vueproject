import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-product/producttenant/page',
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
    url: '/api/blade-product/producttenant/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const updateStatus = (ids,status) => {
  return request({
    url: '/api/blade-product/producttenant/updateStatus',
    method: 'post',
    params: {
      ids,
      status
    }
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-product/producttenant/update',
    method: 'post',
    data: row
  })
}



export const add = (row) => {
  return request({
    url: '/api/blade-product/producttenant/save',
    method: 'post',
    data: row
  })
}
