import Form from '@/core/classes/Form'
import TaskForm from './TaskForm'
import { type CreateTask } from '@/core/interfaces/Task'

export default class TaskRequest extends Form<CreateTask> {
  constructor() {
    super(new TaskForm())

    this.rules = {
      title: 'required|string|min:3'
    }
  }
}
