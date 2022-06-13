import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const viteHMRPort = process.env.VITE_HMR_PORT || 8080
const backendPort = process.env.BACKEND_PORT || 8081

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    proxy: {
      '^/api/.*': {
        target: `http://backend:${backendPort}`,
        ws: true
      }
    },
    hmr: {
      host: 'localhost',
      clientPort: viteHMRPort
    }
  },
  clearScreen: false
})
