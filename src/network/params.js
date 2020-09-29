import {request} from './request'

export function getParams(id, sel, pagesize) {
  return request({
    url: `/categories/${id}/attributes`,
    method: 'get',
    params: {
      id,
      sel
    }
  })
}

export function getAddParams(id, attr_name, attr_sel, attr_vals) {
  return request({
    url: `/categories/${id}/attributes`,
    method: 'post',
    data: {
      id,
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

export function getFindParams(id, attrid, attr_sel, attr_vals) {
  return request({
    url: `/categories/${id}/attributes/${attrid}`,
    method: 'get',
    params: {
      id,
      attrid,
      attr_sel,
      attr_vals
    }
  })
}

export function getGiveParams(id, attrid, attr_name, attr_sel, attr_vals) {
  return request({
    url: `/categories/${id}/attributes/${attrid}`,
    method: 'put',
    data: {
      id,
      attrid,
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

export function getDelParams(id, attrid) {
  return request({
    url: `/categories/${id}/attributes/${attrid}`,
    method: 'delete',
    data: {
      id,
      attrid
    }
  })
}

export function getPutParams(id, attrid, attr_name, attr_sel, attr_vals) {
  return request({
    url: `/categories/${id}/attributes/${attrid}`,
    method: 'put',
    data: {
      id,
      attrid,
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}