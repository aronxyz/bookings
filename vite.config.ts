import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /auth to the API
      '/auth': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,  // Ensures the Origin header is correctly set
        rewrite: (path: string) => path.replace(/^\/auth/, '/auth'),  // Correct type for 'path'
      },

      // Proxy /booking to the API
      '/booking': {
        target: 'https://restful-booker.herokuapp.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/booking/, '/booking'),  // Correct type for 'path'
      },
    },
  },

})
