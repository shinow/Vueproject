import axios from '@/config/axios'

export const userInfo = data => axios({
  url: 'login',
  data
})
