//import resso from 'resso'
import { create } from 'zustand'
import { User } from '@/types/api'

/* const store = resso({
  token: '',
  userInfo: {
    userName: '',
    userEmail: ''
  },
  updateUserInfo(userInfo: User.UserItem) {
    store.userInfo = userInfo
  }
}) */

export const useStore = create<{
  token: string
  userInfo: User.UserItem
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
}>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    deptId: '',
    state: 0,
    role: 0,
    roleList: '',
    createId: 0,
    deptName: '',
    userImg: '',
    mobile: '',
    job: ''
  },
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token })
}))

//export default store
