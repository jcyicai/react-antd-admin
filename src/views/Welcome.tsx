import request from '@/utils/request'
import { Button } from 'antd'

export default function Welcome() {
  const handleClick = () => {
    request.get('/users/login', {})
  }
  return (
    <div>
      <p>Welcome</p>
      <p>
        <Button onClick={handleClick}>点击</Button>
      </p>
    </div>
  )
}
