import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    // host: "143.198.25.100",
    host: "24.144.126.228",
    port: "3002",
  }
  
})
