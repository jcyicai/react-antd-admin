/**
 * localStorage 模块分装
 */

export default {
  /**
   * storage 存储
   * @param key {string} 参数名称
   * @param val {any} 写入值
   */
  set(key: string, val: any) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  /**
   * storage 读取
   * @param key {string} 参数名称
   * @returns storage 值
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * 删除 localStorage 值
   * @param key {string} 参数名称
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清空 localStorage 值
   */
  clear() {
    localStorage.clear()
  }
}
