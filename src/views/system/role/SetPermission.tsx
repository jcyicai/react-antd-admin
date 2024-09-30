import { Form, Input, Modal, Tree } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { message } from '@/utils/AntdGlobal'
import { IAction, IModalProp } from '@/types/modal'
import { Menu, Role } from '@/types/api'
import api from '@/api/index'
import roleApi from '@/api/roleApi'
import { permissionList } from '@/utils/enums'

export default function SetPermission(props: IModalProp) {
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [checkedKeys, setCheckedKeys] = useState([])
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.Permission>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    //const menuList = await api.getMenuList()
    const menuList = permissionList.menuList
    setMenuList(menuList)
  }

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }

  // 提交
  const handleSubmit = async () => {
    if (permission) {
      await roleApi.updatePermission(permission)
      message.success('权限设置成功')
      handleCancel()
      props.update()
    }
  }

  // 取消弹窗
  const handleCancel = () => {
    setVisible(false)
    setPermission(undefined)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)

    const checkedKeys: string[] = []
    const parentKeys: string[] = []
    item.checkNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限'
      okText='确定'
      cancelText='取消'
      width={600}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='角色名称'>{roleInfo?.roleName}</Form.Item>
        <Form.Item label='权限'>
          <Tree
            checkable
            defaultExpandAll
            fieldNames={{
              title: 'menuName',
              key: '_id',
              children: 'children'
            }}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
