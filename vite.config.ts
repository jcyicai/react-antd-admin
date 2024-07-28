import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // tsconfig.app.json文件下需要进行映射，否则 @/XXX 会提示报错
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': 'http://dev.react-antd-admin.com'
    }
  }
})
