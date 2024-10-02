import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { IDetailProp } from '@/types/modal'
import { Order } from '@/types/api'
import orderApi from '@/api/orderApi'
import { message } from '@/utils/AntdGlobal'

export default function OrderMarker(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [markers, setMarkers] = useState<
    { lng: string; lat: string; id: number }[]
  >([]) // 记录坐标数据

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = async (id: string) => {
    setOrderId(id)
    setVisible(true)
    const detail = {
      cityName: '张家港市暨阳湖',
      route: [
        {
          lng: 120.52261004356122,
          lat: 31.854806650412403,
          id: 0.0274389040229841
        },
        {
          lng: 120.53195687910109,
          lat: 31.85871637668913,
          id: 0.008939074814238834
        },
        {
          lng: 120.53777543897361,
          lat: 31.86183347093509,
          id: 0.49754828124860206
        },
        {
          lng: 120.53907533000896,
          lat: 31.85987869546113,
          id: 0.737591019862996
        },
        {
          lng: 120.55312653310533,
          lat: 31.857078538759446,
          id: 0.903707559262451
        },
        {
          lng: 120.56853952681016,
          lat: 31.85718420660921,
          id: 0.2876588190839364
        },
        {
          lng: 120.56265906736454,
          lat: 31.852217685485,
          id: 0.21586234576526353
        },
        {
          lng: 120.55213613993553,
          lat: 31.852851724498432,
          id: 0.33995475335128034
        },
        {
          lng: 120.5519504412162,
          lat: 31.845190125007782,
          id: 0.04953031843561129
        },
        {
          lng: 120.53734214196183,
          lat: 31.844767397363974,
          id: 0.8277884164137836
        },
        {
          lng: 120.53598035135336,
          lat: 31.855070826380178,
          id: 0.8003290983138276
        }
      ]
    } as unknown as Order.OrderItem //await orderApi.getOrderDetail(id)
    setTimeout(() => {
      renderMap(detail)
    })
  }

  // 渲染地图
  const renderMap = (detail: Order.OrderItem) => {
    // BMapGL 需要在 types/index.d.ts 文件声明全局类型
    const map = new window.BMapGL.Map('markerMap')
    const cityName = detail.cityName
    map.centerAndZoom(cityName, 15)
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放
    map.enableScrollWheelZoom() // 滚动缩放
    map.addControl(zoomCtrl)
    const scaleCtrl = new window.BMapGL.ScaleControl() // 添加比例尺
    map.addControl(scaleCtrl)

    // 根据 detail数据还原点
    detail.route?.map(item => {
      createMarker(map, item.lng, item.lat)
    })

    // 绑定事件
    map.addEventListener('click', function (e: any) {
      console.log(e)
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  // 创建 marker  map地图 lng 经度 lat 纬度
  const createMarker = (map: any, lng: string, lat: string) => {
    const id = Math.random()
    // 创建打标点覆盖物
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    markers.push({ lng, lat, id })
    marker.id = id
    // marker添加右击菜单
    const markerMenu = new window.BMapGL.ContextMenu()
    // 添加删除事件
    markerMenu.addItem(
      new window.BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        const index = markers.findIndex(item => item.id === marker.id)
        markers.splice(index, 1)
        setMarkers([...markers])
      })
    )
    setMarkers([...markers])
    // 覆盖物添加右击菜单
    marker.addContextMenu(markerMenu)
    // 添加覆盖物
    map.addOverlay(marker)
  }

  const handleOk = async () => {
    // 保存点数据
    /* await orderApi.updateOrderInfo({
      orderId,
      route: markers
    }) */
    console.log(markers)
    message.success('打点成功')
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
    setMarkers([])
  }

  return (
    <Modal
      title='地图打点'
      okText='确定'
      cancelText='取消'
      width={1100}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='markerMap' style={{ height: 500 }}></div>
    </Modal>
  )
}
