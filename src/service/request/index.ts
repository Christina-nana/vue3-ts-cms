import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { IRequestConfig, ISingleRequestConfig } from './type'

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class createAxiosInstance {
  instance: AxiosInstance

  constructor(config: IRequestConfig) {
    // 1.创建实例
    this.instance = axios.create(config)

    // 3.拦截器：添加全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')
        return config
      },
      (error) => {
        // console.log('全局请求失败的拦截')
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')
        return res.data
      },
      (error) => {
        // console.log('全局响应失败的拦截')
        return error
      }
    )

    // 3. 拦截器：给创建的单个实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestCallSuccess,
      config.interceptors?.requestCallFail
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseCallSuccess,
      config.interceptors?.responseCallFail
    )
  }

  // 2.封装网络请求的方法：axios.request()方法
  request<T = any>(config: ISingleRequestConfig<T>) {
    // 3. 拦截器：给创建的单个请求添加拦截器
    if (config.interceptors?.requestCallSuccess) {
      // this.instance.interceptors.request.use() // ❌：不能这么做，这么做是添加到实例里面，下次请求就会进行该拦截。这是单个请求的拦截，所以不能这么做
      config = config.interceptors.requestCallSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseCallSuccess) {
            res = config.interceptors.responseCallSuccess(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: ISingleRequestConfig<T>) {
    return this.instance.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: ISingleRequestConfig<T>) {
    return this.instance.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: ISingleRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: ISingleRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default createAxiosInstance
