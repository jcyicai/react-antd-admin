//import resso from 'resso'
import { create } from 'zustand'
import { User } from '@/types/api'
import storage from '@/utils/storage'

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
  collapsed: boolean
  isDark: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
  updateCollapsed: (collapsed: boolean) => void
  updateTheme: (isDark: boolean) => void
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
  collapsed: false,
  isDark: storage.get('isDark') || false,
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token }),
  updateCollapsed: () =>
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    }),
  updateTheme: (isDark: boolean) => set({ isDark })
}))

//export default store
