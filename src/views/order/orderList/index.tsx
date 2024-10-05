import orderApi from '@/api/orderApi'
import { Order, PageParams, User } from '@/types/api'
import { formatDate, formatMoney } from '@/utils'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import CreateOrderNew from './components/CreateOrderNew'
import OrderDetail from './components/OrderDetail'
import OrderMarker from './components/OrderMarker'
import OrderRoute from './components/OrderRoute'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'

export default function UserList() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])
  const orderRef = useRef<{
    open: (type: IAction, data?: Order.OrderItem) => void
  }>()
  const detailRef = useRef<{
    open: (id: string) => void
  }>()
  const markerRef = useRef<{
    open: (id: string) => void
  }>()
  const routeRef = useRef<{
    open: (id: string) => void
  }>()

  // 参数第一个为分页，第二个为表单业务参数
  const getTableData = (
    {
      current,
      pageSize
    }: {
      current: number
      pageSize: number
    },
    formData: Order.Params
  ) => {
    return orderApi
      .getOrderList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(res => {
        // 必须返回这个格式
        const data = {
          page: { total: 10 },
          list: [{ oderId: '11', userName: 'jc', _id: '1111' }]
        }
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }

  // 第一个必须为 promise,第二个为表单参数
  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    // 是个数组 第二个是表单参数
    defaultParams: [
      { current: 1, pageSize: 10 },
      {
        state: 1
      }
    ]
  })

  // 创建用户
  const handleCreate = () => {
    orderRef.current?.open('create')
  }

  const handleDetail = (id: string) => {
    detailRef.current?.open(id)
  }

  const handleMarker = (id: string) => {
    markerRef.current?.open(id)
  }

  const handleRoute = (id: string) => {
    routeRef.current?.open(id)
  }

  // 编辑用户
  const handleEdit = (record: Order.OrderItem) => {
    orderRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDelete = (orderId: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该订单吗？</span>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleOrderDelSubmit(orderId)
      }
    })
  }

  // 公共删除用户接口
  const handleOrderDelSubmit = async (id: string) => {
    try {
      const params = {
        _id: id
      }
      await api.deleteUser(params)
      message.success('删除成功')
      setUserIds([])
      search.reset()
    } catch (error) {}
  }

  const handleExport = async () => {
    await orderApi.exportData(form.getFieldsValue())
  }

  const columns: TableColumnsType<Order.OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderMount',
      key: 'orderMount',
      render(orderMount: number) {
        return formatMoney(orderMount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state: Order.IState) {
        const stateMap = {
          1: '进行中',
          2: '已完成',
          3: '超时',
          4: '取消'
        }
        return stateMap[state as keyof typeof stateMap] || '进行中'
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      key: 'operate',
      render(record: Order.OrderItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleDetail(record.orderId)}>
              详情
            </Button>
            <Button type='text' onClick={() => handleMarker(record.orderId)}>
              打点
            </Button>
            <Button type='text' onClick={() => handleRoute(record.orderId)}>
              轨迹
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div className='order-list'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='ordrId' label='订单ID'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 140 }} placeholder='请选择'>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={search.submit}>
            搜索
          </Button>
          <Button type='default' onClick={search.reset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>订单列表</div>
          <div className='action'>
            {/* 权限按钮 */}
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' onClick={handleExport}>
              导出
            </Button>
          </div>
        </div>
        <Table rowKey='_id' {...tableProps} bordered columns={columns} />
      </div>
      <CreateOrderNew
        mRef={orderRef}
        update={() => {
          search.reset()
        }}
      />
      <OrderDetail mRef={detailRef} />
      <OrderMarker mRef={markerRef} />
      <OrderRoute mRef={routeRef} />
    </div>
  )
}
