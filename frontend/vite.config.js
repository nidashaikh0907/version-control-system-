import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    preview: {
    allowedHosts: ['version-control-system-1-a2ix.onrender.com'],
  },
  server: {
    allowedHosts: ['version-control-system-1-a2ix.onrender.com'],
  },
})
