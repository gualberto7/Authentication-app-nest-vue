import api from '@/api/api'
import { TaskStatus, type Task } from '@/core/interfaces/Task'

export const index = async () => {
  try {
    const response = await api.get('/tasks')
    return response.data
  } catch (error: any) {
    console.log(error)
  }
}

export const remove = async (id: string) => {
  try {
    await api.delete(`/tasks/${id}`)
  } catch (error: any) {
    console.log(error)
  }
}

export const markAsDone = async (id: string) => {
  try {
    await api.patch(`/tasks/${id}`, { status: TaskStatus.DONE })
  } catch (error: any) {
    console.log(error)
  }
}
