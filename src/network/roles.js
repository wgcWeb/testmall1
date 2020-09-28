import {request} from './request'

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getDeleteRoles(roleId, rightId) {
  return request({
    url: `/roles/${roleId}/rights/${rightId}`,
    method: 'delete',
    data: {
      roleId,
      rightId
    }
  })
}

export function getAllRoles() {
  return request({
    url: '/rights/tree',
    method: 'get'
  })
}

export function getGiveRoles(roleId, rids) {
  return request({
    url: `/roles/${roleId}/rights`,
    method: 'post',
    data: {
      roleId,
      rids
    }
  })
}

export function getAddRoles(roleName, roleDesc) {
  return request({
    url: '/roles',
    method: 'post',
    data: {
      roleName,
      roleDesc
    }
  })
}

export function getFindRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'get',
    params: {
      id
    }
  })
}

export function getEditRole(id, roleName, roleDesc) {
  return request({
    url: `/roles/${id}`,
    method: 'put',
    data: {
      id,
      roleName,
      roleDesc
    }
  })
}

export function getDelRole(id) {
  return request({
    url: `/roles/${id}`,
    method: 'delete',
    data: {
      id
    }
  })
}


