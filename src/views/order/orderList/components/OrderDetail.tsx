import { Descriptions, DescriptionsProps, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { IDetailProp } from '@/types/modal'
import { Order } from '@/types/api'
import orderApi from '@/api/orderApi'

export default function OrderDetail(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState<Order.OrderItem>()

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = async (id: string) => {
    setVisible(true)
    const detail = await orderApi.getOrderDetail(id)
    if (detail) {
      setDetail(detail)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setDetail(undefined)
  }

  // 订单状态格式化
  const formatState = (state: Order.IState) => {
    if (!state) return '-'
    const stateMap = {
      1: '进行中',
      2: '已完成',
      3: '超时',
      4: '取消'
    }
    return stateMap[state]
  }

  const items: DescriptionsProps['items'] = [
    {
      label: 'UserName',
      children: detail?.userName
    },
    {
      label: 'Telephone',
      children: <p>1810000000</p>
    }
  ]

  return (
    <Modal
      title='订单详情'
      width={800}
      open={visible}
      footer={false}
      onCancel={handleCancel}
    >
      <Descriptions
        column={2}
        style={{ padding: '10px 30px' }}
        items={items}
      ></Descriptions>
    </Modal>
  )
}
