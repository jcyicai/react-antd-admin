import api from '@/api'
import { Dept, User } from '@/types/api'
import { IAction, IModalProp } from '@/types/modal'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { message } from '@/utils/AntdGlobal'

export default function CreateDept(props: IModalProp<Dept.EditParams>) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [userList, setUserList] = useState<User.UserItem[]>([])

  useEffect(() => {
    getDeptList()
    getAllUserList()
  }, [])

  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDeptList(data)
  }

  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (
    type: IAction,
    data?: Dept.EditParams | { parentId: string }
  ) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await api.createDept(params)
        message.success('创建成功')
      } else {
        await api.editDept(params)
        message.success('修改成功')
      }
      handleCancel()
      props.update()
    }
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择'
            allowClear
            treeDefaultExpandAll
            fieldNames={{
              label: 'deptName',
              value: '_id'
            }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item
          label='部门名称'
          name='deptName'
          rules={[{ required: true, message: '请输入部门名称' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          label='负责人'
          name='userName'
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <Select placeholder='请选择'>
            {userList.map(item => {
              return (
                <Select.Option value={item.userName} key={item.userName}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
