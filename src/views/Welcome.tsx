import request from '@/utils/request'
import { Button } from 'antd'
import storage from '@/utils/storage'
const DORA_KEY = 'dora'
import { formatDate, formatMoney, formatNum, toLocalDate } from '@/utils'
export default function Welcome() {
  const handleClick = (type: number) => {
    console.log(formatMoney('13123121.13666'))
    console.log(formatNum('12345345.5666'))
    console.log(toLocalDate(new Date('2024-01-01'), 'yyyy-MM-dd'))
    console.log('formatDate', formatDate(new Date('2024-06-06'), 'yyyy-MM-dd HH:mm:ss'))
    if (type === 0) {
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
    } else if (type === 1) {
      storage.set(DORA_KEY, { name: 'jc' })
    } else if (type === 2) {
      console.log(storage.get(DORA_KEY))
    } else if (type === 3) {
      storage.remove(DORA_KEY)
    } else if (type === 4) {
      storage.clear()
    }
  }
  return (
    <div>
      <p>Welcome</p>
      <p>
        <Button onClick={() => handleClick(0)}>点击</Button>
        <Button onClick={() => handleClick(1)}>写入值</Button>
        <Button onClick={() => handleClick(2)}>读取值</Button>
        <Button onClick={() => handleClick(3)}>删除值</Button>
        <Button onClick={() => handleClick(4)}>清空所有值</Button>
      </p>
    </div>
  )
}
