//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // 严格模式下会导致两次请求
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
)
