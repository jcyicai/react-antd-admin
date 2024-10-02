import { Form, Input, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { message } from '@/utils/AntdGlobal'
import { IAction, IModalProp } from '@/types/modal'
import { Role } from '@/types/api'
import api from '@/api'

export default function CreateRole(props: IModalProp<Role.EditParams>) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
    }
  }

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await api.createRole(params)
        message.success('创建成功')
      } else {
        await api.editRole(params)
        message.success('修改成功')
      }
      handleCancel()
      props.update()
    }
  }

  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '创建角色' : '编辑角色'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        {/* 设置隐藏域用来存储用户 id，也可以设置变量来存储 */}
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='角色名称'
          name='roleName'
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
