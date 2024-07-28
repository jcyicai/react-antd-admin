import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/react')
  }
  return (
    <div>
      <NavLink to='/vite'>
        <img src={viteLogo} className='logo' alt='Vite logo' />
      </NavLink>
      <NavLink to='/react'>
        <img src={reactLogo} className='logo react' alt='React logo' />
      </NavLink>
      <button onClick={handleClick}>点击跳转react</button>
    </div>
  )
}

export default App
