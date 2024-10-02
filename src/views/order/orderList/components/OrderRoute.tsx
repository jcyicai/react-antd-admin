import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import { IDetailProp } from '@/types/modal'
import { Order } from '@/types/api'
import orderApi from '@/api/orderApi'
import { message } from '@/utils/AntdGlobal'

export default function OrderRoute(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [trackAni, setTrackAni] = useState<{
    cancel: () => void
  }>()

  // 暴露子组件的 open 方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 调用弹框显示
  const open = async (id: string) => {
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
    if (detail.route.length > 0) {
      setTimeout(() => {
        renderMap(detail)
      })
    } else {
      message.info('请先完成打点上报')
    }
  }

  // 渲染地图 https://lbsyun.baidu.com/jsdemo.htm#webgl6_1
  const renderMap = (detail: Order.OrderItem) => {
    // BMapGL 需要在 types/index.d.ts 文件声明全局类型
    const map = new window.BMapGL.Map('orderRouteMap')
    const cityName = detail.cityName
    map.centerAndZoom(cityName, 16)
    map.enableScrollWheelZoom() // 滚动缩放

    const point = []
    const path = detail.route || []
    for (var i = 0; i < path.length; i++) {
      point.push(new window.BMapGL.Point(path[i].lng, path[i].lat))
    }
    const polyline = new window.BMapGL.Polyline(point, {
      strokeWeight: '6', // 折线宽度 以像素为单位
      strokeOpacity: 0.8, // 折线透明度，取值范围 0-1
      strokeColor: '#ed6c00' // 折线颜色
    })
    setTimeout(start, 1000)
    function start() {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
        overallView: true,
        tilt: 30,
        duration: 20000,
        delay: 300
      })
      trackAni.start()
      setTrackAni(trackAni)
    }
  }

  const handleCancel = () => {
    setVisible(false)
    // 解决关闭弹窗后再次打开还在执行动画
    trackAni?.cancel()
  }

  return (
    <Modal
      title='行动轨迹'
      okText='确定'
      cancelText='取消'
      width={1100}
      footer={false}
      open={visible}
      onCancel={handleCancel}
    >
      <div id='orderRouteMap' style={{ height: 500 }}></div>
    </Modal>
  )
}
