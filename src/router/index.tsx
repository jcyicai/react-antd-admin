import { Navigate, useRoutes } from 'react-router-dom'
import Welcome from '@/views/Welcome'
import Login from '@/views/login/Login'
import Error404 from '@/views/404'
import Error403 from '@/views/403'

const router = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/403',
    element: <Error403 />
  }
]

export default function Router() {
  return useRoutes(router)
}
