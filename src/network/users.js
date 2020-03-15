import originAxios from './axios'

export function getUserList( params ) {
  return originAxios({
    url: '/users',
    params
  })
}

export function addUser( data ) {
  return originAxios({
    url: '/users',
    method: 'post',
    data
  })
}

//修改用户状态
export function toggleState( data ) {
  return originAxios({
    // url: '/users/'+data.id+'state/'+data.mg_state,
    url: 'users/'+data.id+'/state/'+data.mg_state,
    method: 'put',
  })
}

//搜索
export function searchUser( params ) {
  return originAxios({
    url: '/users',
    params
  })
}

//编辑用户提交
export function editUser( params ) {
  return originAxios({
    url: '/users/'+params.id,
    method: 'put',
    data: {
      email: params.email,
      mobile: params.mobile
    }
  })
}
