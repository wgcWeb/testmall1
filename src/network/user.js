import {request} from './request'

export function getUser(query, pagenum, pagesize) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function getUserChange(id, mg_state) {
  return request({
    url: `/users/${id}/state/${mg_state}`,
    method: 'put',
    data: {
      id,
      mg_state
    }
  })
}

export function getAddUser(username, password, email, mobile) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

export function getFindUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'get',
    params: {
      id
    }
  })
}

export function getEditUser(id, email, mobile) {
  return request({
    url: `/users/${id}`,
    method: 'put',
    data: {
      id,
      email,
      mobile
    }
  })
}

export function getDeleteUser(id) {
  return request({
    url: `/users/${id}`,
    method: 'delete',
    data: {
      id
    }
  })
}