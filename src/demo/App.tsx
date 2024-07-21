import { useState, useTransition } from 'react'
import '../App.css'

function App() {
  const [query, setQuery] = useState('')
  const [list, setList] = useState<any>([])
  // 返回一个状态，和函数
  const [isPending, startTransition] = useTransition()

  const handleChange = (e: any) => {
    setQuery(e.target.value)
    startTransition(() => {
      const arr = Array.from({ length: 1000 }).fill(1)
      setList([...list, ...arr])
    })
  }
  return (
    <div>
      <input type='text' onChange={handleChange} value={query} />
      <div>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          list.map((item: number, index: number) => {
            return <p key={index}>{query}</p>
          })
        )}
      </div>
    </div>
  )
}

export default App
