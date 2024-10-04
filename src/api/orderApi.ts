import { params } from './../types/api'
import request from '@/utils/request'
import { Order, ResultData } from '@/types/api'

export default {
  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>('/order/list', params)
  },
  // 创建角色
  createOrder(params: Order.CreateParams) {
    return request.post('/order/create', params)
  },
  getOrderDetail(id: string) {
    return request.get<Order.OrderItem>(`/order/getDetail/${id}`)
  },
  updateOrderInfo(params: Order.OrderRoute) {
    return request.post('/order/edit', params)
  },
  exportData(params: Order.Params) {
    return request.downloadFile('/order/orderExport', params, '订单列表.xlsx')
  },
  // 获取城市聚合数据
  getCityData(cityId: number) {
    return request.get<Array<{ lng: string; lat: string }>>(
      `/order/cluster/${cityId}`
    )
  }
  /*   // 编辑订单
  editOrder(params: Order.EditParams) {
    return request.post('/order/edit', params)
  },
  // 删除订单
  deleteRole(params: Order.DelParams) {
    return request.post('/order/delete', params)
  }, */
}
