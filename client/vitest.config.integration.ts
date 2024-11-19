import { defineConfig, mergeConfig } from 'vite'
//import vue from '@vitejs/plugin-vue'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [],
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['**/integration/**'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/__tests__/**',
        '**/.{idea,git,cache,output,temp}/**'
      ]
    }
  })
)
