import request from '@/utils/request'
import { useEffect } from 'react'
export default function Login() {
  useEffect(() => {
    request
      .get('/users', {
        id: 12345
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
