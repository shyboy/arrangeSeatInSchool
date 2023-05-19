import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import electron from 'vite-plugin-electron'


// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
 }, 
  plugins: [electron({
    entry: 'electron/main.ts',
  }),vue(), vueJsx(),ElementPlus(),AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    
  },
  // vite.config.ts
optimizeDeps: {
  include: ['@antv/x6-plugin-keyboard > mousetrap'],
  exclude: ['@antv/x6-plugin-keyboard']
}
})
