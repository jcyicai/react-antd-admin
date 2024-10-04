import orderApi from '@/api/orderApi'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import ClusterData from '@/utils/clusterData'

export default function OrderCluster() {
  const [cityId, setCityId] = useState(10001)

  useEffect(() => {
    getCityData()
  }, [cityId])

  const getCityData = async () => {
    const data = ClusterData.data as unknown as Array<{
      lng: string
      lat: string
    }> //await orderApi.getCityData(cityId)
    setTimeout(() => {
      renderMap(data)
    })
  }

  const renderMap = (data: Array<{ lng: string; lat: string }>) => {
    const map = new window.BMapGL.Map('clusterMap')
    map.enableScrollWheelZoom()
    const zoomCtrl = new window.BMapGL.ZoomControl()
    map.addControl(zoomCtrl)
    const cityNames: { [k: number]: string } = {
      10001: '杭州'
    }
    map.centerAndZoom(cityNames[cityId], 12)

    const markers = []
    for (let i = 0; i < data.length; i++) {
      const { lng, lat } = data[i]
      // 生成坐标点
      const point = new window.BMapGL.Point(lng, lat)
      const marker = new window.BMapGL.Marker(point)
      markers.push(marker)
    }
    if (markers.length > 0) {
      // 生成聚合
      new window.BMapLib.MarkerClusterer(map, { markers: markers })
    }
  }

  const handleChange = (val: number) => {
    setCityId(val)
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: 10 }}>
      <Select
        style={{ width: 100, marginBottom: 10 }}
        value={cityId}
        onChange={handleChange}
      >
        <Select.Option value={10001}>杭州</Select.Option>
      </Select>
      <div id='clusterMap' style={{ height: 'calc(100vh - 232px)' }}></div>
    </div>
  )
}
