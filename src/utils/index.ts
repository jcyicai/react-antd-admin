/**
 * 工具函数封装
 */

// 格式化金额（推荐）
export const formatMoney = (num: number | string) => {
  const a = parseFloat(num.toString())
  return a.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' })
}

// 格式化数字
export const formatNum = (num: number | string) => {
  const a = num.toString()
  /**
   * 正则匹配是循环的
   * \d 匹配数字
   * ?= 预判或者断言
   * \d{3} 匹配是哪个数字
   * $1 第一次捕获的数据后加 ,  （比如12345，那么这里 $1 为 12）
   * \. 表示跟着小数位
   */
  if (a.indexOf('.') > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return a.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
}

// 格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) {
    curDate = date
  }
  if (rule === 'yyyy-MM-dd') {
    return curDate.toLocaleDateString().replaceAll('/', '-')
  }
  if (rule === 'HH:mm:ss') {
    return curDate.toLocaleTimeString().replaceAll('/', '-')
  }
  return curDate.toLocaleString().replaceAll('/', '-')
}

// 格式化日期
export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date

  let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

  type OType = {
    [key: string]: number
  }
  const O: OType = {
    'M+': curDate.getMonth() + 1,
    'd+': curDate.getDate(),
    'H+': curDate.getHours(),
    'm+': curDate.getMinutes(),
    's+': curDate.getSeconds()
  }

  for (const k in O) {
    fmt = fmt.replace(new RegExp(`${k}`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString())
  }

  return fmt
}
