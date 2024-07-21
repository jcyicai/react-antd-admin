import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import BaseRouter from './router'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from './router1'

// React.StrictMode 严格模式，会造成两次渲染
/* ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <BaseRouter />
  </BrowserRouter>
) */

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
