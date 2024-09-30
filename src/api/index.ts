import request from '@/utils/request'
import { Dashboard, Login, ResultData, User, Dept, Menu } from '@/types/api'
import Role from './roleApi'

export default {
  // 登录
  login(params: Login.params): Promise<Login.response> {
    return request.post('/user/login', params, {
      showLoading: false,
      showError: true
    })
  },
  // 获取用户数据
  getUserInfo() {
    return request.get<User.UserItem>('/user/getUserInfo')
  },
  // 获取用户数据
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
      '/users/getPermissionList'
    )
  },
  // 获取工作台汇总数据
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  // 获取用户列表
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  // 编辑用户
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  deleteUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },
  // 部门管理
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  // 所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 编辑部门
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  // 创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  // 编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  // 删除菜单
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  },
  ...Role
}
