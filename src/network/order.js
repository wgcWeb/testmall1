import {request} from './request'

export function getOrder(query, pagenum, pagesize) {
  return request({
    url: '/orders',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function getKDOrder(id) {
  return request({
    url: `/kuaidi/${id}`,
    method: 'get',
    params: {
      id
    }
  })
}