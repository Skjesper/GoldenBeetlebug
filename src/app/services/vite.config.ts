import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/.*': {
        target: 'https://tivoli.yrgobanken.vip',
        changeOrigin: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq) => {
              console.log('Sending Request:', proxyReq.method, proxyReq.path);
            });
            proxy.on('proxyRes', (proxyRes) => {
              console.log('Received Response:', proxyRes.statusCode);
            });
          },
      }
    }
  }
})