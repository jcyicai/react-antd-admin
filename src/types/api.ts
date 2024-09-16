// 接口类型定义
export interface Result<T = any> {
  code: number
  data: T
  message: string
  success: boolean
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

export interface PageParams {
  pageNum: number
  pageSize: number
}

export namespace Login {
  export interface params {
    username: string
    password: string
  }
  export interface response {
    token: string
  }
}

export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
  export interface UserItem {
    _id: string
    userId: number
    userName: string
    userEmail: string
    deptId: string
    state: number
    role: number
    roleList: string
    createId: number
    deptName: string
    userImg: string
    mobile: string
    job: string
  }
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    deptId: string
    job?: string
    state: number
    roleList: string[]
    userImg: string
  }
  export interface EditParams extends CreateParams {
    userId: number
  }
}

export namespace Dashboard {
  export interface ReportData {
    driverCount: number
    totalMoney: number
    orderCount: number
    cityNum: number
  }

  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
}
