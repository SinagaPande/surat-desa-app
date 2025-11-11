import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ KONFIGURASI YANG BENAR:
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
})