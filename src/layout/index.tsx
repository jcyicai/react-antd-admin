import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import {
  Navigate,
  Outlet,
  useLocation,
  useRouteLoaderData
} from 'react-router-dom'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { router } from '@/router'
import { searchRoute } from '@/utils'
import TabsFC from '@/components/Tabs'

const { Sider } = Layout

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo } = useStore()
  const { pathname } = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (
      !data.menuPathList.includes(pathname) &&
      !staticPath.includes(pathname)
    ) {
      return <Navigate to='/403' />
    }
  }

  return (
    <Watermark content='React'>
      {userInfo._id ? (
        <Layout>
          <Sider collapsed={collapsed}>
            <Menu />
          </Sider>
          <Layout>
            <NavHeader />
            <TabsFC></TabsFC>
            <div className={styles.content}>
              <div className={styles.wrapper}>
                <Outlet></Outlet>
              </div>
              <NavFooter />
            </div>
          </Layout>
        </Layout>
      ) : null}
    </Watermark>
  )
}

export default App
