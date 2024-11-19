import { TaskStatus } from '@/core/interfaces/Task'

export default class TaskForm {
  title: string
  description: string
  status: TaskStatus

  constructor() {
    this.title = ''
    this.description = ''
    this.status = TaskStatus.IN_PROGRESS
  }
}
