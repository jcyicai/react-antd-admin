import request from '@/utils/request'
import { Login } from '@/types/api'

export default {
  login(params: Login.params): Promise<Login.response> {
    return request.post('/auth/login', params)
  }
}
