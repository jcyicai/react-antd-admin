import styles from './index.module.less'

const NavFooter = () => {
  return (
    <div className={styles.navFooter}>
      <div>
        <a>JC主页</a>
        <span className='gutter'>|</span>
        <a>React后台管理系统</a>
        <span className='gutter'>|</span>
        <a>Vue全栈后台</a>
      </div>
      <div>Copyright ©2024 JasnChen All Rights Reserved</div>
    </div>
  )
}

export default NavFooter
