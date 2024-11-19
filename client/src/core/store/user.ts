import type { User } from '@/core/interfaces/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/api'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const setUser = (newUser: User) => {
    user.value = newUser
    if (newUser.token) {
      localStorage.setItem('token', newUser.token)
    }
    console.log('redirecting to /')
    router.push('/')
  }
  const clearUser = () => {
    localStorage.removeItem('token')
    user.value = null
    router.push('/auth/sign-in')
  }

  const loadUser = async () => {
    try {
      const response = await api.get('/auth/profile')
      setUser(response.data.user)
    } catch (error) {
      clearUser()
      console.error(error)
    }
  }

  return { user, setUser, clearUser, loadUser }
})
