import {request} from './request'

export function getMenu() {
  return request({
    url: '/menus',
    method: 'get'
  })
}