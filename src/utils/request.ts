import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import { message } from 'antd'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'

// 创建实例
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',
  withCredentials: true, // 跨域
  headers: {
    apifoxToken: 'RXuVPLvmdqh6m2qHPOx80'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    showLoading()
    const token = storage.get('token') // 'RXuVPLvmdqh6m2qHPOx80'
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // mock 是否开启 配置不同接口地址
    if (import.meta.env.VITE_MOCK === 'true') {
      config.baseURL = env.mockApi
    } else {
      config.baseURL = env.baseApi
    }
    return {
      ...config
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data: Result = response.data
    hideLoading()
    if (data.code === 500001) {
      message.error(data.message)
      storage.remove('token')
      //location.href = '/login'
    } else if (data.code != 0) {
      message.error(data.message)
      return Promise.reject(data)
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params)
  }
}
