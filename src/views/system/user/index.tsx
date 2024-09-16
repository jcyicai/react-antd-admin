import api from '@/api'
import { PageParams, User } from '@/types/api'
import { formatDate } from '@/utils'
import { Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useEffect, useRef, useState } from 'react'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'

export default function UserList() {
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void | undefined
  }>()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  // 搜索
  const handleSearch = () => {
    const values = form.getFieldsValue()
    getUserList({
      ...values,
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
    const values = form.getFieldsValue()
    getUserList({
      ...values,
      pageNum: 1,
      pageSize: 10
    })
  }
  // 获取用户列表
  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const { list, page } = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    setData(list)
    setTotal(list.length)
  }

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  // 删除用户
  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  // 公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      const params = {
        userIds: ids
      }
      await api.deleteUser(params)
      message.success('删除成功')
      getUserList({
        pageNum: 1,
        pageSize: pagination.pageSize
      })
    } catch (error) {}
  }

  const columns: TableColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'operate',
      render(record: User.UserItem) {
        // 当未设置 dataIndex，第一个参数则为 row 数据
        // 否则 为 当前字段值，比如 createTime
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button
              type='text'
              danger
              onClick={() => handleDelete(record.userId)}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div className='user-list'>
      <Form
        className='search-form'
        form={form}
        layout='inline'
        initialValues={{ state: 0 }}
      >
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 140 }} placeholder='请选择'>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={handleSearch}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize: pageSize
              })
            }
          }}
          bordered
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }}
      />
    </div>
  )
}
