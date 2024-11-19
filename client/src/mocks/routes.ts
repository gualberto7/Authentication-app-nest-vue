import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

export const mockRouter = createRouter({
  history: createWebHistory(),
  routes: routes
})
