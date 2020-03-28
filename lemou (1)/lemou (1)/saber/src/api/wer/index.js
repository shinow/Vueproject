import request from '@/router/axios';

export const getcode = (params) => {
  return request({
    url: '/api/blade-user/user-getGoogle', //
    method: 'get',
    params
  })
}

export const Postcode = (code,secret) => {
  return request({
    url: '/api/blade-user/user-googleCheck', //
    method: 'post',
    params: {
      code,
      secret
    }
  })
}
