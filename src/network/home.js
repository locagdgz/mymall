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
