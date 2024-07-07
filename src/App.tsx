import { useState } from 'react'
import { flushSync } from 'react-dom'

function App() {
  /* const name = 'JC'
  const list = [1, 2, 3]
  const flag = false
  return (
    <>
      <p>{name}</p>
      <p style={{ color: 'red', fontSize: '20px' }}>{name}</p>
      <p>{flag ? 'jc' : 'cc'}</p>
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>
        })}
      </ul>
    </>
  ) */

  const [name, setName] = useState('JC')
  const [user, setUser] = useState({ name: 'jc', age: 18 })
  const [list, setList] = useState([1, 2, 3])
  const [count, setCount] = useState(0)

  function handleClick() {
    setName('React')
  }

  function handleUpdateUser() {
    setUser({ ...user, age: 20 })
  }

  function handleList() {
    // 直接push没用，需要创建新的数组
    setList([...list, 4])
  }

  function handleCount() {
    // 上一次值累加
    //setCount(count => count + 1)

    // 只执行一次
    /* setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1) */

    // setCount异步函数 放到异步函数中转为同步
    /* setTimeout(() => {
      setCount(count + 1)
    }) */

    // 同步更新 但只渲染一次 react18做了合并处理 提升了性能，18之前会渲染两次
    flushSync(() => {
      setCount(count => count + 1)
      setCount(count => count + 1)
    })
  }

  return (
    <>
      <p>{name}</p>
      <p>
        {user.name}-{user.age}
      </p>
      <ul>
        {list.map(item => {
          return <li key={item}>{item}</li>
        })}
      </ul>
      <p>{count}</p>
      <button onClick={handleClick}>点击修改</button>
      <button onClick={handleUpdateUser}>点击用户</button>
      <button onClick={handleList}>点击列表</button>
      <button onClick={handleCount}>点击数值</button>
    </>
  )
}

export default App
