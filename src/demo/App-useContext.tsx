import React, { useContext } from 'react'
import '../App.css'

const UserContext = React.createContext({ name: '' })
function App() {
  return (
    <UserContext.Provider value={{ name: 'jason' }}>
      <div>
        <p>测试</p>
        <Child1 />
      </div>
    </UserContext.Provider>
  )
}

function Child1() {
  return (
    <div>
      <p>
        <span>Child1</span>
      </p>
      <p>
        <Child2 />
      </p>
    </div>
  )
}

function Child2() {
  const { name } = useContext(UserContext)
  return <span>Child2{name}</span>
}

export default App
