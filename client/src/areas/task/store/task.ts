import { TaskStatus, type Task } from '@/core/interfaces/Task'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = reactive<Task[]>([])

  const setTasks = (newTasks: Task[]) => {
    tasks.splice(0, tasks.length, ...newTasks)
  }

  const addTask = (task: Task) => {
    tasks.unshift(task)
  }

  const markTaskAsDone = (id: string) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks[index].status = TaskStatus.DONE
    }
  }

  const removeTask = (id: string) => {
    const index = tasks.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.splice(index, 1)
    }
  }

  return {
    setTasks,
    addTask,
    removeTask,
    markTaskAsDone,

    tasks: computed(() => tasks)
  }
})
