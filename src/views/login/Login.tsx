import styles from './index.module.less'
import { Button, Form, Input, message } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'

export default function LoginFC() {
  const onFinish = async (values: Login.params) => {
    const res = await api.login(values)
    console.log(res)
    storage.set('token', res.token)
    message.success('登录成功')
    const params = new URLSearchParams(location.search)
    location.href = params.get('callback') || '/welcome'
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder='账号' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder='密码' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
