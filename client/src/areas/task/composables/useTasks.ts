import api from '@/api/api'
import { useTasksStore } from '../store/task'
import { useSnackbarStore } from '@/core/store/snackbar'
import { TaskStatus, type CreateTask, type Task } from '@/core/interfaces/Task'
import DeleteTaskCommand from '../commands/deleteTaskCommand'

export const useTasks = () => {
  const { setTasks, addTask, removeTask, markTaskAsDone } = useTasksStore()
  const { showSnackbar } = useSnackbarStore()

  const getTasks = async () => {
    try {
      const response = await api.get('/tasks')
      setTasks(response.data)
    } catch (error: any) {
      console.log(error)
    }
  }

  const markAsDone = async (task: Task) => {
    try {
      await api.patch(`/tasks/${task.id}`, { status: TaskStatus.DONE })
      markTaskAsDone(task.id)
      showSnackbar('Task marked as done')
    } catch (error: any) {
      console.log(error)
    }
  }

  const create = async (task: CreateTask) => {
    try {
      const { data } = await api.post<Task>('/tasks', task)
      addTask(data)
      showSnackbar('Task created successfully')
    } catch (error: any) {
      console.log(error)
    }
  }

  const remove = async (task: Task) => {
    const command = new DeleteTaskCommand(task)
    command.execute()
  }

  return {
    getTasks,
    markAsDone,
    create,
    remove
  }
}
