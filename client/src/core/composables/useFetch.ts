import { ref, watchEffect } from 'vue'
import api from '@/api/api'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await api.get(url)
      if (response.statusText !== 'OK') {
        throw new Error(response.statusText)
      }
      data.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return {
    data,
    error,
    loading,
    fetchData
  }
}
