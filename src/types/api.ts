// 接口类型定义

export interface Result<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

export namespace Login {
  export interface params {
    username: string
    password: string
  }
}
