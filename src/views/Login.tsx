import request from '@/utils/request'
import { useEffect } from 'react'
export default function Login() {
  useEffect(() => {
    request
      .post('/auth/login', {
        username: 'admin',
        password: 123456
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return <div>login</div>
}
