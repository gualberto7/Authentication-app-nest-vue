import { ref } from 'vue'
import { useUserStore } from '@/core/store/user'
import api from '@/api/api'

export const useAuth = (form: any) => {
  const { setUser } = useUserStore()
  const errorMessage = ref('')

  const signIn = async () => {
    try {
      const response = await api.post('/auth/sign-in', form.model)
      setUser(response.data)
    } catch (error: any) {
      console.log(error)
      errorMessage.value = error.response?.data.message
    }
  }

  const signUp = async () => {
    api
      .post('/auth/sign-up', form.model)
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.warn(error)
        form.setErrors(error.response?.data.message || [])
      })
  }

  return {
    signUp,
    signIn,
    errorMessage
  }
}
