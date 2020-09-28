import {request} from './request'

export function getRights() {
  return request({
    url: '/rights/list',
    method: 'get'
  })
}
