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
    host: '0.0.0.0',
    port: 9557,
    proxy: {
      '/api': 'https://apifoxmock.com/m1/4899804-4556231-default'
    }
  }
})
