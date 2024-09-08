import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
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
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }

  const handleMenuClick = (item: any) => {
    /*  let path = '/'
    if (item.keyPath.length === 1) {
      path = `/${item.keyPath[0]}`
    }

    path = `/${item.keyPath.reverse().join('/')}`
    console.log(path)
    navigate(path) */
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' className={styles.img} />
        <span>货运管理系统</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} onClick={handleMenuClick} />
    </div>
  )
}

export default SideMenu
