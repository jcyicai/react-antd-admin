/**
 * 环境配置封装
 */

type ENV = 'dev' | 'stg' | 'prd'

/* let env: ENV = 'dev'
if (location.host.indexOf('localhost') > -1) {
  env = 'dev'
} else if (location.host.indexOf('localhost1') > -1) {
  env = 'stg'
} else {
  env = 'prd'
} */

const env: ENV = (document.documentElement.dataset.env as ENV) || 'dev'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'https://apifoxmock.com/m1/4899804-4556231-default',
    cdn: 'http://www.aliyun.com',
    mock: true,
    mockApi: 'https://apifoxmock.com/m1/4899804-4556231-default/api'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'https://apifoxmock.com/m1/4899804-4556231-default',
    cdn: 'http://www.aliyun.com',
    mock: false,
    mockApi: 'https://apifoxmock.com/m1/4899804-4556231-default/api'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'https://apifoxmock.com/m1/4899804-4556231-default',
    cdn: 'http://www.aliyun.com',
    mock: false,
    mockApi: 'https://apifoxmock.com/m1/4899804-4556231-default/api'
  }
}

export default {
  env,
  ...config[env]
}
