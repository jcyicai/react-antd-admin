import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login/Login'
import Error404 from '@/views/404'
import Error403 from '@/views/403'
import Layout from '@/layout'
import AuthLoader from './AuthLoader'
import { lazyLoad } from './LazyLoad' // 懒加载
import React from 'react'

export const router = [
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader, // 会优先处理 查看 Layout组件中逻辑 需设置 id
    children: [
      {
        path: '/welcome',
        element: lazyLoad(React.lazy(() => import('@/views/welcome')))
      },
      {
        path: '/dashboard',
        element: lazyLoad(React.lazy(() => import('@/views/dashboard')))
      },
      {
        path: '/userList',
        element: lazyLoad(React.lazy(() => import('@/views/system/user')))
      },
      {
        path: '/deptList',
        element: lazyLoad(React.lazy(() => import('@/views/system/dept')))
      },
      {
        path: '/menuList',
        element: lazyLoad(React.lazy(() => import('@/views/system/menu')))
        /* meta: {
          auth: false  // 权限关闭
        } */
      },
      {
        path: '/roleList',
        element: lazyLoad(React.lazy(() => import('@/views/system/role')))
      },
      {
        path: '/orderList',
        element: lazyLoad(React.lazy(() => import('@/views/order/orderList')))
      },
      {
        path: '/cluster',
        element: lazyLoad(
          React.lazy(() => import('@/views/order/orderCluster'))
        )
      },
      {
        path: '/driverList',
        element: lazyLoad(React.lazy(() => import('@/views/order/driverList')))
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
