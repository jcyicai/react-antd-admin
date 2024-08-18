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
  export interface response {
    token: string
  }
}

export namespace User {
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
