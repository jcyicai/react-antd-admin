import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
    {
      key: '1',
      label: '工作台',
      icon: <DesktopOutlined />
    },
    {
      key: '2',
      label: '系统管理',
      icon: <SettingOutlined />,
      children: [
        {
          key: '3',
          label: '用户管理',
          icon: <TeamOutlined />
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' className={styles.img} />
        <span>货运管理系统</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}

export default SideMenu
