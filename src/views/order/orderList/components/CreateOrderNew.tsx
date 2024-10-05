import { Modal } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import type { GetProp, UploadProps } from 'antd'
import { message } from '@/utils/AntdGlobal'
import { IAction, IModalProp } from '@/types/modal'
import { Order } from '@/types/api'
import api from '@/api'
import FormRender, { useForm } from 'form-render'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function CreateOrder(props: IModalProp<Order.EditParams>) {
  const form = useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  // 初始化下拉数据
  const getInitData = async () => {
    const cityList: any = [] //await api.getCityList()
    form.setSchema({
      cityName: {
        props: {
          options: cityList
        }
      }
    })
  }

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
      form.setValues(data)
    }
  }

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getValues()
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

  const schema = {
    type: 'object',
    displayType: 'row', // 行布局
    column: 2, // 一行两列
    labelWidth: 120,
    properties: {
      cityName: {
        title: '城市名称',
        type: 'string',
        widget: 'select',
        rules: [{ required: true, message: '请选择城市名称' }],
        props: {
          options: [
            { label: '早', value: 'a' },
            { label: '中', value: 'b' },
            { label: '晚', value: 'c' }
          ]
        }
      },
      userName: {
        title: '用户名称',
        type: 'string',
        widget: 'input',
        rules: [{ required: true, message: '请输入用户名称' }]
      },
      mobile: {
        title: '手机号',
        type: 'string',
        widget: 'inputNumber',
        placeholder: '请输入下单手机号',
        rules: [{ pattern: /^1[1-9]\d{9}$/, message: '请输入有效的手机号' }]
      }
    }
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
      <FormRender
        form={form}
        schema={schema}
        onMount={getInitData}
      ></FormRender>
    </Modal>
  )
}
