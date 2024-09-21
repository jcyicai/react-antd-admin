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
  pageSize?: number
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
// 用户管理
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
// 部门管理
export namespace Dept {
  export interface Params {
    deptName?: string
  }
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  export interface EditParams extends CreateParams {
    _id: string
  }
  export interface DelParams {
    _id: string
  }
  export interface DeptItem {
    _id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}
// 菜单管理
export namespace Menu {
  export interface Params {
    menuName?: string
    menuState?: number
  }
  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number // 1菜单 2按钮 3页面
    menuState: number // 1正常 2停用
    menuCode?: string
    parentId?: string
    path?: string
    component?: string
    orderBy?: number
  }
  export interface EditParams extends CreateParams {
    _id?: string
  }
  export interface DelParams {
    _id: string
  }
  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
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
