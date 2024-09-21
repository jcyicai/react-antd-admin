import React, { useEffect } from 'react'
import { Layout, Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import styles from './index.module.less'
import api from '@/api'
import { useStore } from '@/store'

const { Sider } = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  const data = useRouteLoaderData('layout')

  return (
    <Watermark content='React'>
      <Layout>
        <Sider>
          <Menu />
        </Sider>
        <Layout>
          <NavHeader />
          {/* <Content className={styles.content}> */}
          <div className={styles.wrapper}>
            <Outlet></Outlet>
          </div>
          <NavFooter />
          {/* </Content> */}
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
