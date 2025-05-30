import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: false,
    host: '0.0.0.0',
    allowedHosts: ['manchesterunitednews-435032931.eu-west-2.elb.amazonaws.com']
  }

})
