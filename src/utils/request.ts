import axios from 'axios'
import { hideLoading, showLoading } from './loading'
import storage from './storage'
import env from '@/config'
import { Result } from '@/types/api'
import { message } from './AntdGlobal'

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
    if (config.showLoading) {
      showLoading()
    }
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

    // 如果是 blob 对象 直接返回
    if (response.config.responseType === 'blob') return response

    if (data.code === 500001) {
      message.error(data.message)
      storage.remove('token')
      location.href = `/login?callback=${encodeURIComponent(location.href)}`
    } else if (data.code != 0) {
      if (!response.config.showError) {
        return Promise.resolve(data)
      } else {
        message.error(data.message)
        return Promise.reject(data)
      }
    }
    return data.data
  },
  error => {
    hideLoading()
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

interface IConfig {
  showLoading?: boolean
  showError?: boolean
}

export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options })
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.post(url, params, options)
  },
  downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
    instance({
      url,
      data,
      method: 'post',
      responseType: 'blob'
    }).then(response => {
      // 创建一个大对象
      const blob = new Blob([response.data], {
        type: response.data.type
      })
      // 和后端沟通 放在 headers
      const name = (response.headers['file-name'] as string) || fileName
      const link = document.createElement('a')
      link.download = decodeURIComponent(name) // 解码 防止乱码
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static
      link.href = URL.createObjectURL(blob)
      document.body.append(link)
      link.click() // 触发下载
      document.body.removeChild(link) // 下载完删除
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static
      window.URL.revokeObjectURL(link.href) // 关键 进行释放
    })
  }
}
