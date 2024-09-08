import { params } from './../types/api'
import request from '@/utils/request'
import { Dashboard, Login, ResultData, User } from '@/types/api'

export default {
  // 登录
  login(params: Login.params): Promise<Login.response> {
    return request.post('/user/login', params, { showLoading: false, showError: true })
  },
  // 获取用户数据
  getUserInfo() {
    return request.get<User.UserItem>('/user/getUserInfo')
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
  }
}
