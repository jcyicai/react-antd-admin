import storage from '@/utils/storage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, TreeSelect, Upload } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import type { GetProp, UploadProps } from 'antd'
import { message } from '@/utils/AntdGlobal'
import { IAction, IModalProp } from '@/types/modal'
import { Dept, Role, User } from '@/types/api'
import api from '@/api'
import roleApi from '@/api/roleApi'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function CreateUser(props: IModalProp) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])

  useEffect(() => {
    getDeptList()
    getRoleList()
  }, [])

  const getDeptList = async () => {
    const deptList = await api.getDeptList()
    setDeptList(deptList)
  }
  const getRoleList = async () => {
    const roleList = await roleApi.getAllRoleList()
    setRoleList(roleList)
  }

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg)
    }
  }

  // 提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue(),
        userImg: img
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
    setImg('')
    form.resetFields()
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpeg或者png的图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能大于2MB')
    }
    return isJpgOrPng && isLt2M
  }

  const handleUploadChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      setLoading(false)
      const { code, data, message } = info.file.response
      if (code === 0) {
        setImg(data.file)
        console.log(img)
      } else {
        message.error(message)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试')
    }
  }
  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        {/* 设置隐藏域用来存储用户 id，也可以设置变量来存储 */}
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='用户名称'
          name='userName'
          rules={[
            { required: true, message: '请输入用户名称' },
            { min: 2, max: 12, message: '用户名称最小2个字符，最大12个字符' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[
            { required: true, message: '请输入用户邮箱' },
            { type: 'email', message: '邮箱格式错误' },
            { pattern: /^\w+@qq.com$/, message: '邮箱必须以@qq.com结尾' }
          ]}
        >
          <Input placeholder='请输入用户邮箱' disabled={action === 'edit'} />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[
            { len: 11, message: '手机号必须为11位数字' },
            { pattern: /1[1-9]\d{9}/, message: '手机号必须1开头的11位数字' }
          ]}
        >
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          label='部门'
          name='deptId'
          rules={[{ required: false, message: '请选择部门' }]}
        >
          <TreeSelect
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            placeholder='请输入部门'
            fieldNames={{
              label: 'deptName',
              value: '_id'
            }}
            treeData={deptList}
          />
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
        <Form.Item label='角色' name='roleList'>
          <Select placeholder='请选择角色'>
            {roleList.map(item => {
              return (
                <Select.Option value={item._id} key={item._id}>
                  {item.roleName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label='用户头像'>
          <Upload
            listType='picture-circle'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer ' + storage.get('token'),
              apifoxToken: 'RXuVPLvmdqh6m2qHPOx80'
            }}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
          >
            {img ? (
              <img
                src={img}
                style={{ width: '100%', borderRadius: '100%' }}
                key={img}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
