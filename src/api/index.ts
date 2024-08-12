import request from '@/utils/request'
import { Login, User } from '@/types/api'

export default {
  login(params: Login.params): Promise<Login.response> {
    return request.post('/user/login', params, { showLoading: false, showError: true })
  },
  getUserInfo() {
    return request.get<User.UserItem>('/user/getUserInfo')
  }
}
