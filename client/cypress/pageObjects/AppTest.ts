import TaskPage from './TaskPage'
import SnackbarPage from './SnackbarPage'
import signPage from './signInPage'

class AppTest {
  signIn: signPage
  taskPage: TaskPage
  snackbarPage: SnackbarPage

  constructor() {
    this.signIn = new signPage()
    this.taskPage = new TaskPage()
    this.snackbarPage = new SnackbarPage()
  }
}

export default new AppTest()
