import api from '@/api'
import { Menu } from '@/types/api'
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import CreateMenu from './CreateMenu'
import { message } from '@/utils/AntdGlobal'
import { IAction } from '@/types/modal'
import { formatDate } from '@/utils'

export default function MenuList() {
  const [form] = useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])
  const menuRef = useRef<{
    open: (
      type: IAction,
      data?: Menu.EditParams | { parentId?: string; orderBy?: number }
    ) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
    getMenuList()
  }

  const handleCreate = () => {
    menuRef.current?.open('create', { orderBy: data.length })
  }

  // 添加子部门
  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', {
      parentId: record._id,
      orderBy: record.children?.length
    })
  }

  // 编辑部门
  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  // 删除部门
  const MENU_TYPE_MAP = {
    1: '菜单',
    2: '按钮',
    3: '页面'
  }
  const handleDelete = (record: Menu.MenuItem) => {
    const text =
      MENU_TYPE_MAP[record.menuType as keyof typeof MENU_TYPE_MAP] || '菜单'
    Modal.confirm({
      title: '删除确认',
      content: `确认删除该${text}吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        handleMenuDelSubmit(record._id)
      }
    })
  }

  // 公共删除部门接口
  const handleMenuDelSubmit = async (id: string) => {
    try {
      const params = {
        _id: id
      }
      await api.deleteMenu(params)
      message.success('删除成功')
    } catch (error) {}
  }

  const columns: TableColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(menuType: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[menuType]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component'
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
      render(record: Menu.MenuItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDelete(record)}>
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
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select
            style={{ width: 140 }}
            placeholder='请选择'
            options={[
              {
                value: 1,
                label: '正常'
              },
              {
                value: 0,
                label: '停用'
              }
            ]}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr10' onClick={getMenuList}>
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
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
