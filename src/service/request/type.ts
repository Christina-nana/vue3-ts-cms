import type {
  CreateAxiosDefaults,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios'

// 单个实例拦截器类型设置
export interface InterceptorsFnType {
  requestCallSuccess?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestCallFail?: (err: any) => any
  responseCallSuccess?: (res: AxiosResponse) => AxiosResponse
  responseCallFail?: (err: any) => any
}

export interface IRequestConfig extends CreateAxiosDefaults {
  interceptors?: InterceptorsFnType
}

// 单个请求拦截器类型设置
export interface ISingleInterceptorsFnType<T = AxiosResponse> {
  requestCallSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestCallFail?: (err: any) => any
  responseCallSuccess?: (res: T) => T
  responseCallFail?: (err: any) => any
}

export interface ISingleRequestConfig<T> extends AxiosRequestConfig {
  interceptors?: ISingleInterceptorsFnType<T>
}
