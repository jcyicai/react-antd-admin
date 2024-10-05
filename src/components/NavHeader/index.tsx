import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import BreadCrumb from './BreadCrumb'
import { useEffect } from 'react'

const NavHeader = () => {
  const { userInfo, collapsed, isDark, updateTheme, updateCollapsed } =
    useStore()

  useEffect(() => {
    // 第一次加载需要触发一次
    handleSwitch(isDark)
  }, [])

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: `邮箱：${userInfo.userEmail}`
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  const toggleCollapsed = () => {
    updateCollapsed()
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = `/login?callback=${encodeURIComponent(location.href)}`
    }
  }

  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.dataset.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
    storage.set('isDark', isDark)
    updateTheme(isDark)
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <div onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
        <BreadCrumb />
      </div>
      <div className={styles.right}>
        <Switch
          checked={isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={handleSwitch}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
