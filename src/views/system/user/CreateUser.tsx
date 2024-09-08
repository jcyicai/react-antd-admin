import { Form, Input, Modal, Select } from 'antd'

export default function CreateUser() {
  const [form] = Form.useForm()
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
  }
  const handleCancel = () => {}
  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item
          label='用户名称'
          name='userName'
          rules={[{ required: true, message: '请输入用户名称' }]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[{ required: true, message: '请输入用户邮箱' }]}
        >
          <Input placeholder='请输入用户邮箱' />
        </Form.Item>
        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          label='部门'
          name='deptId'
          rules={[{ required: true, message: '请输入部门' }]}
        >
          <Input placeholder='请输入部门' />
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select placeholder='请选择状态'>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色' name='role'>
          <Input placeholder='请输入角色' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
