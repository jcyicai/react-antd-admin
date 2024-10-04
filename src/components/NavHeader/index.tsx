import { MenuFoldOutlined } from '@ant-design/icons'
import { Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'
import storage from '@/utils/storage'
import BreadCrumb from './BreadCrumb'

const NavHeader = () => {
  const userInfo = useStore(state => state.userInfo)
  const breadList = [
    {
      title: '首页'
    },
    {
      title: '工作台'
    }
  ]
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

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = `/login?callback=${encodeURIComponent(location.href)}`
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuFoldOutlined />
        <BreadCrumb />
      </div>
      <div className={styles.right}>
        <Switch
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
