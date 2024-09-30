import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import { useStore } from '@/store'
import type { MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const data: any = useRouteLoaderData('layout')
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  // 处理刷新页面 原来选中菜单丢失问题
  const { pathname } = useLocation()

  type MenuItem = Required<MenuProps>['items'][number]

  // 生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  // 创建图标
  function createIcon(name?: string) {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (
    menuList: IMenu.MenuItem[],
    treeList: MenuItem[] = []
  ) => {
    menuList.forEach((item, index) => {
      // 菜单状态有效
      if (item.menuType === 1 && item.menuState === 1) {
        // buttons 存在 则说明只有一级 不存在子集
        if (item.buttons) {
          return treeList.push(
            getItem(item.menuName, item.path || index, createIcon(item.icon))
          )
        }
        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            getTreeMenu(item.children || [])
          )
        )
      }
    })
    return treeList
  }

  // 初始化 获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  /* const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: '工作台',
      icon: <DesktopOutlined />
    },
    {
      key: 'system',
      label: '系统管理',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'userList',
          label: '用户管理',
          icon: <TeamOutlined />
        },
        {
          key: 'deptList',
          label: '部门管理',
          icon: <TeamOutlined />
        }
      ]
    }
  ] */

  // logo点击
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  // 菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' className={styles.img} />
        <span>货运管理系统</span>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        items={menuList}
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
      />
    </div>
  )
}

export default SideMenu
