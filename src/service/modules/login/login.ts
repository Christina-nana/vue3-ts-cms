import { baseRequest } from '@/service'
import type { IAcount } from '@/types'

interface IAcountRes {
  code: number
  data: {
    id: string
    name: string
    token: string
  }
}

export function accountLoginRequest(account: IAcount) {
  return baseRequest.request<IAcountRes>({
    url: '/login',
    method: 'post',
    data: account
    // 单个请求拦截器
    // interceptors: {
    //   requestCallSuccess(config) {
    //     console.log('单个请求拦截成功')
    //     return config
    //   },
    //   requestCallFail(err) {
    //     console.log('单个请求拦截失败')
    //     return err
    //   },
    //   responseCallSuccess(res) {
    //     console.log('单个响应拦截成功')
    //     return res
    //   },
    //   responseCallFail(err) {
    //     console.log('单个响应拦截失败')
    //     return err
    //   }
    // }
  })
}

export function getUserInfoById(id: string) {
  return baseRequest.request({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: string) {
  return baseRequest.request({
    url: `/role/${id}/menu`
  })
}
