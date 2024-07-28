import { Link, Navigate, useRoutes } from 'react-router-dom'
import App from './App.tsx'

function ReactComp() {
  return (
    <div>
      React组件<Link to='..'>back</Link>
    </div>
  )
}

function ViteComp() {
  return (
    <div>
      Vite组件<Link to='..'>back</Link>
    </div>
  )
}

function TestComp() {
  return <div>test组件{<Navigate to='/react' />}</div>
}

function NotFound() {
  return (
    <h2>
      404,当前页面不存在 <Link to='..'>back</Link>
    </h2>
  )
}

function BaseRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <App />
    },
    {
      path: '/react',
      element: <ReactComp />
    },
    {
      path: '/vite',
      element: <ViteComp />
    },
    {
      path: '/test',
      element: <TestComp />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routes
}

export default BaseRouter
