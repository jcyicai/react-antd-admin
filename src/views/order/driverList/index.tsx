import orderApi from '@/api/orderApi'
import { Order } from '@/types/api'
import { Button, Form, Input, Select, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useAntdTable } from 'ahooks'

export default function UserList() {
  const [form] = Form.useForm()

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
          list: [{ driverName: 'jc', _id: '1111' }]
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

  const columns: TableColumnsType<Order.OrderItem> = [
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
      fixed: 'left',
      width: 100
    },
    {
      title: '司机信息',
      dataIndex: 'driverName',
      key: 'driverName',
      fixed: 'left',
      width: 200,
      render(_, record) {
        return (
          <div>
            <p>
              <span>司机名称：</span>
              <span>JC</span>
            </p>
            <p>
              <span>车辆品牌：</span>
              <span>奔驰</span>
            </p>
          </div>
        )
      }
    },
    {
      title: '司机状态',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '车辆信息',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '昨日在线时长',
      dataIndex: 'cityName',
      key: 'cityName'
    },
    {
      title: '昨日司机流水',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '司机评分',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '行为分',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '昨日推单数',
      dataIndex: 'startAddress',
      key: 'startAddress'
    },
    {
      title: '昨日完单数',
      dataIndex: 'startAddress',
      key: 'startAddress'
    }
  ]
  return (
    <div className='order-list'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='userName' label='司机名称'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='state' label='司机状态'>
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
          <div className='title'>司机列表</div>
        </div>
        <Table
          scroll={{ x: 'max-content' }}
          rowKey='_id'
          {...tableProps}
          bordered
          columns={columns}
        />
      </div>
    </div>
  )
}
