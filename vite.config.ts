import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import postcssPxToViewPort from 'postcss-px-to-viewport'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPxToViewPort(),
      ],
    },
  },
})
