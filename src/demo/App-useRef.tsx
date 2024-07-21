import { useRef, useState } from 'react'
import '../App.css'

function App() {
  const [val, setVal] = useState('')
  const userRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    userRef.current?.focus()
    setVal(userRef.current?.value || '')
  }
  return (
    <div>
      <input type='text' ref={userRef} />
      <button onClick={handleClick}>按钮</button>
      <p>{val}</p>
    </div>
  )
}

export default App
