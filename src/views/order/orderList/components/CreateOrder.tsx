import storage from '@/utils/storage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Form, Input, Modal, Row, Select, TreeSelect, Upload } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import type { GetProp, UploadProps } from 'antd'
import { message } from '@/utils/AntdGlobal'
import { IAction, IModalProp } from '@/types/modal'
import { Dept, Order, Role, User } from '@/types/api'
import api from '@/api'
import roleApi from '@/api/roleApi'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function CreateOrder(props: IModalProp<Order.EditParams>) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = (type: IAction, data?: Order.OrderItem) => {
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
        await api.createUser(params)
        message.success('创建成功')
      } else {
        await api.editUser(params)
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
      title={action === 'create' ? '创建订单' : '编辑订单'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout='horizontal'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign='right'
      >
        <Row>
          <Col span={12}>
            <Form.Item label='城市名称' name='cityName'>
              <Input placeholder='请输入岗位' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='城市名称' name='cityName'>
              <Input placeholder='请输入岗位' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
