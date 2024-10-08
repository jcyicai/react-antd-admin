// import ReactDOM from 'react-dom/client'
// import Loading from './loading'
import './loading.less'

// 处理多个请求 只显示一次 loading 显示
let count = 0

// 第一种方案
/* export const showLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    ReactDOM.createRoot(loading).render(<Loading />)
  }

  count++
}

export const hideLoading = () => {
  if (count < 0) return
  count--
  if (count === 0) {
    document.body.removeChild(document.getElementById('loading') as HTMLDivElement)
  }
} */

// 第二种实现 推荐
export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'flex')
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'none')
  }
}
