import api from '@/api'
import { Menu } from '@/types/api'
import { getMenuPath } from '@/utils'
import { permissionList } from '@/utils/enums'

export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}

export default async function AuthLoader() {
  //const data = await api.getPermissionList()
  const data = permissionList
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList
  }
}
