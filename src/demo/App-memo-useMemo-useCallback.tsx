import { useEffect, useState, useMemo, memo, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useWindowSize } from '../utils'

// memo 缓存组件 去除后父组件重新渲染会再次渲染
const Child = memo(({ onClick }: any) => {
  console.log('child...')
  return (
    <p>
      我是子节点<button onClick={onClick}>子节点点击</button>
    </p>
  )
})

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

  /* const [name, setName] = useState('JC')
  const [user, setUser] = useState({ name: 'jc', age: 18 })
  const [list, setList] = useState([1, 2, 3])
  const [count, setCount] = useState(0) */

  /* function handleClick() {
    setName('React')
  }

  function handleUpdateUser() {
    setUser({ ...user, age: 20 })
  }

  function handleList() {
    // 直接push没用，需要创建新的数组
    setList([...list, 4])
  } */

  //function handleCount() {
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
  /* flushSync(() => {
      setCount(count => count + 1)
      setCount(count => count + 1)
    }) */
  //}

  const [count, setCount] = useState(0)
  // const [total, setTotal] = useState(0)

  const resize = useWindowSize()

  /*  useEffect(() => {
    document.title = 'react后台管理系统'
  })

  useEffect(() => {
    setTotal(count + 1)
  }, [count]) */

  const total1 = () => {
    console.log('total1')
    return 1
  }
  const total2 = useMemo(() => {
    console.log(`total2:${count}`)
    return count
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  // useCallback 缓存方法
  const handleChildClick = useCallback(() => {
    console.log('子节点点击')
  }, [])

  return (
    <>
      {/* <p>{count}</p>
      <p>{total}</p>
      <p>宽度：{resize.width}</p>
      <p>高度：{resize.height}</p> */}
      <button onClick={handleClick}>点击</button>
      <Child onClick={handleChildClick} />
      {/*<p>{name}</p>
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
      <button onClick={handleCount}>点击数值</button>*/}
    </>
  )
}

export default App
