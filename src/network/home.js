import {request} from "./request"

/**
 * 请求首页数据
 * @returns {AxiosPromise}
 */
export function getHomeMultiData(){
  return request({
    url: '/home/multidata'
  })
}

/**
 * 分页请求 tabControl 组件渲染数据
 * @param type pop流行/news新款/sell精选
 * @param page 页码
 */
export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
