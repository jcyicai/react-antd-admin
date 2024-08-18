import { Button, Card, Descriptions, DescriptionsProps } from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { formatMoney, formatNum, formatState } from '@/utils'
import api from '@/api'
import { Dashboard } from '@/types/api'
import { debug } from 'console'
import { useCharts } from '@/hook/useCharts'

export default function DashBoard() {
  const [report, setReport] = useState<Dashboard.ReportData>()
  const userInfo = useStore(state => state.userInfo)
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户ID',
      children: <p>{userInfo.userId}</p>
    },
    {
      key: '2',
      label: '邮箱',
      children: <p>{userInfo.userEmail}</p>
    },
    {
      key: '3',
      label: '状态',
      children: <p>{formatState(userInfo.state)}</p>
    },
    {
      key: '4',
      label: '手机号',
      children: <p>{userInfo.mobile}</p>
    },
    {
      key: '5',
      label: '岗位',
      children: <p>{userInfo.job}</p>
    },
    {
      key: '6',
      label: '部门',
      children: <p>{userInfo.deptName}</p>
    }
  ]

  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    lineChart?.setOption({
      title: {
        text: '订单和流水走势图'
      },
      legend: {
        data: ['订单', '流水']
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          data: [150, 230, 224, 218, 135, 147, 260, 100, 88, 220, 111, 222],
          type: 'line'
        },
        {
          name: '流水',
          data: [1500, 2300, 2240, 2180, 1350, 1470, 2600, 1000, 880, 2200, 1110, 2220],
          type: 'line'
        }
      ]
    })

    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: '北京' },
            { value: 310, name: '上海' },
            { value: 274, name: '广州' },
            { value: 235, name: '杭州' },
            { value: 400, name: '武汉' }
          ]
        }
      ]
    })

    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          center: ['50%', '50%'],
          data: [
            { value: 25, name: '北京' },
            { value: 40, name: '上海' },
            { value: 35, name: '广州' },
            { value: 30, name: '杭州' },
            { value: 55, name: '武汉' }
          ]
        }
      ]
    })

    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: [
          { name: '服务态度', max: 10 },
          { name: '在线时长', max: 600 },
          { name: '接单率', max: 100 },
          { name: '评分', max: 5 },
          { name: '关注度', max: 10000 }
        ]
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              value: [8, 300, 80, 4, 9000],
              name: '司机模型诊断'
            }
          ]
        }
      ]
    })
  }, [lineChart, pieChart1, pieChart2, radarChart])

  useEffect(() => {
    getReportData()
  }, [])

  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img src='http://resource.cycblog.cn/image/admin_logo.png' alt='' className={styles.userImg} />
        <Descriptions title='欢迎新同学！' items={items} />
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
