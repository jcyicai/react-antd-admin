import request from '@/utils/request'
import { Dashboard, Login, User } from '@/types/api'

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
  }
}
