import originAxios from './axios'

export function menus() {
  return originAxios({
    url: '/menus',
  })
}

