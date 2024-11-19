import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '@/core/layouts/authenticated.vue'
import GestLayout from '@/core/layouts/guests.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/areas/home/Home.vue')
      }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/sign-in',
    component: GestLayout,
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import('@/areas/auth/pages/SignIn.vue')
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('@/areas/auth/pages/SignUp.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export { routes }

export default router
