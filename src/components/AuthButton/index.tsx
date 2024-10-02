import { IAuthLoader } from '@/router/AuthLoader'
import { Button } from 'antd'
import { useRouteLoaderData } from 'react-router-dom'
import { useStore } from '@/store'

export default function AuthButton(props: any) {
  // 获取 store 中  role 角色状态  超管
  const role = useStore(state => state.userInfo.role)
  // 获取 权限按钮数据 也可以存到 store中
  const data = useRouteLoaderData('layout') as IAuthLoader
  if (!props.auth) {
    return <Button {...props}>{props.children}</Button>
  }
  if (data.buttonList.includes(props.auth) || role === 1) {
    return <Button {...props}>{props.children}</Button>
  }
  return <></>
}
