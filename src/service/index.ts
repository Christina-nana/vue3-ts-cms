import createAxiosInstance from './request'
import { BASE_URL, TIME_OUT } from './config'

// 基础请求实例
const baseRequest = new createAxiosInstance({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // 实例拦截器
  // interceptors: {
  //   requestCallSuccess(config) {
  //     console.log('单个实例的请求拦截成功')
  //     return config
  //   },
  //   requestCallFail(err) {
  //     console.log('单个实例的请求拦截成功')
  //     return err
  //   },
  //   responseCallSuccess(res) {
  //     console.log('单个实例的响应拦截成功')
  //     return res
  //   },
  //   responseCallFail(err) {
  //     console.log('单个实例的响应拦截失败')
  //     return err
  //   }
  // }
})

export { baseRequest }
