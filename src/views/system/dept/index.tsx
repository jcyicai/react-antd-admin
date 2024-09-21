import api from '@/api'
import { Dept } from '@/types/api'
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TableColumnsType
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import CreateDept from './CreateDept'
import { message } from '@/utils/AntdGlobal'
import { IAction } from '@/types/modal'
import { formatDate } from '@/utils'

export default function DeptList() {
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>([])
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, [])

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }

  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  // 添加子部门
  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  // 编辑部门
  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  // 删除部门
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该部门吗？</span>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleDeptDelSubmit(id)
      }
    })
  }

  // 公共删除部门接口
  const handleDeptDelSubmit = async (id: string) => {
    try {
      const params = {
        _id: id
      }
      await api.deleteDept(params)
      message.success('删除成功')
    } catch (error) {}
  }

  const columns: TableColumnsType<Dept.DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200
    },
    {
      title: '负责人',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render(record: Dept.DeptItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
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
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='部门名称' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getDeptList}>
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
          </div>
        </div>
        <Table
          rowKey='_id'
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
