import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
      '/booking': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
      '/checkin': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
