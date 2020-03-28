import request from './axios'
export const loginByUsername = (params) => request({
  url: '/api/blade-auth/oauth/token',
  method: 'post',
  headers: {'Authorization': "Basic c2FiZXI6c2FiZXJfc2VjcmV0",
  "Tenant-Id": "000000"},
  params
})
export const getList = (params) => {
  return request({
    url: '/api/blade-product/channel/page',
    method: 'get',
   
    params
  })
}

export const getDetail = (params) => {
  return request({
    url: '/api/blade-product/producttenant/detail',
    method: 'get',
    params
  })
}

export const update = (data) => {
  return request({
    url: '/api/blade-product/producttenant/update',
    method: 'post',
    data
  })
}

export const add = (data) => {
  return request({
    url: '/api/blade-product/producttenant/save',
    method: 'post',
    data
  })
}
