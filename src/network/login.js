import originAxios from './axios'

export function login( params ) {
  return originAxios({
    url: '/login',
    method:'post',
    data: params
  })
}

