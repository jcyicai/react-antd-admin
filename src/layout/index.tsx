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

const { Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const { pathname } = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  const route = searchRoute(pathname, router)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    // 权限判断
    const data = useRouteLoaderData('layout') as IAuthLoader
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
      <Layout>
        <Sider>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </div>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
