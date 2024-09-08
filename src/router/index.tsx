import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/welcome'
import DashBoard from '@/views/dashboard'
import User from '@/views/system/user'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'

const router = [
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/userList',
        element: <User />
      }
    ]
  },
  {
    path: '/',
    element: <Navigate to='/welcome' />
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

const createRouter = createBrowserRouter(router)

export default createRouter

/* export default function Router() {
  return useRoutes(router)
} */
