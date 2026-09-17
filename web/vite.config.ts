import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages project site: https://jolaaa999.github.io/LABA/
  base: '/LABA/',
})
