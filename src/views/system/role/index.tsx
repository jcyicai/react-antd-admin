import api from '@/api'
import { PageParams, Role } from '@/types/api'
import { formatDate } from '@/utils'
import { Button, Form, Input, Modal, Space, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import CreateRole from './CreateRole'
import SetPermission from './SetPermission'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'

export default function RoleList() {
  const [form] = Form.useForm()
  const [roleIds, setRoleIds] = useState<number[]>([])
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()
  const permissionRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
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
    formData: Role.Params
  ) => {
    return api
      .getRoleList({
        ...formData,
        pageNum: current,
        pageSize: pageSize
      })
      .then(res => {
        // 必须返回这个格式
        const data = {
          page: {
            total: 1
          },
          list: [
            {
              _id: '11',
              roleName: '角色一',
              remark: '',
              permissionList: [],
              updateTime: '2024-09-30',
              createTime: '2024-09-30'
            }
          ]
        }
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }

  // 第一个必须为 promise,第二个为表单参数
  const { tableProps, search } = useAntdTable(getTableData, {
    form
    //defaultPageSize: 2
  })

  // 创建角色
  const handleCreate = () => {
    roleRef.current?.open('create')
  }

  // 编辑角色
  const handleEdit = (record: Role.RoleItem) => {
    roleRef.current?.open('edit', record)
  }

  // 删除角色
  const handleDelete = (roleId: string) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该角色吗？</span>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleRoleDelSubmit(roleId)
      }
    })
  }

  // 公共删除用户接口
  const handleRoleDelSubmit = async (roleId: string) => {
    try {
      const params = {
        _id: roleId
      }
      await api.deleteRole(params)
      message.success('删除成功')
      setRoleIds([])
      search.reset()
    } catch (error) {}
  }

  // 设置权限
  const handlePromission = (record: Role.RoleItem) => {
    permissionRef.current?.open('edit', record)
  }

  const columns: TableColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
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
      key: 'operate',
      render(record: Role.RoleItem) {
        // 当未设置 dataIndex，第一个参数则为 row 数据
        // 否则 为 当前字段值，比如 createTime
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handlePromission(record)}>
              设置权限
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
    <div className='role-wrap'>
      <Form
        className='search-form'
        form={form}
        layout='inline'
        initialValues={{ state: 0 }}
      >
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入' />
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
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table rowKey='_id' {...tableProps} bordered columns={columns} />
      </div>
      <CreateRole
        mRef={roleRef}
        update={() => {
          search.reset()
        }}
      />
      <SetPermission
        mRef={permissionRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}
