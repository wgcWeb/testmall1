import {request} from './request'

export function getCate(type, pagenum, pagesize) {
  return request({
    url: '/categories',
    method: 'get',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

export function getAddCate(cat_pid, cat_name, cat_level) {
  return request({
    url: '/categories',
    method: 'post',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}

export function getFindCate(id) {
  return request({
    url: `/categories/${id}`,
    method: 'get',
    params: {
      id
    }
  })
}

export function getEditCate(id, cat_name) {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data: {
      id,
      cat_name
    }
  })
}

export function getDelCate(id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete',
    data: {
      id
    }
  })
}



