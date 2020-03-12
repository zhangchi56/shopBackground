import axios from './axios'

export function login( params ) {
  return axios({
    baseURL: '/admin/login',
    method:'post',
    params
  })
}

