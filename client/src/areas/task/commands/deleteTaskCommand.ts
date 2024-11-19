import type { Command } from '@/core/interfaces/Command'
import type { Task } from '@/core/interfaces/Task'
import { useSnackbarStore } from '@/core/store/snackbar'
import { useTasksStore } from '../store/task'
import { remove } from '../services/task.service'

const TIME = 3000

class DeleteTaskCommand implements Command {
  private task: Task
  private snackbarStore = useSnackbarStore()
  private tasksStore = useTasksStore()
  private timeout: NodeJS.Timeout | null = null

  constructor(task: Task) {
    this.task = task
  }

  execute() {
    this.tasksStore.removeTask(this.task.id)
    this.snackbarStore.showSnackbar('Task removed successfully')
    this.timeout = setTimeout(() => {
      remove(this.task.id)
    }, TIME)
  }

  undo(): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.tasksStore.addTask(this.task)
    this.snackbarStore.showSnackbar('Task added back')
  }
}

export default DeleteTaskCommand
