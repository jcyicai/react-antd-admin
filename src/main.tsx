//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 严格模式下会导致两次请求
  //<React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#ed6c00'
      }
    }}
  >
    <App />
  </ConfigProvider>

  //</React.StrictMode>
)
