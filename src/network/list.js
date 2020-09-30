import {request} from './request'

export function getList(query, pagenum, pagesize) {
  return request({
    url: '/goods',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function getDelList(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete',
    data: {
      id
    }
  })
}

export function getAddGoods(goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs) {
  return request({
    url: '/goods',
    method: 'post',
    data: {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs
    }
  })
}