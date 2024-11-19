import AppTest from '../pageObjects/AppTest'

describe('Crud tasks', () => {
  it('should create, show, update and remove tasks', () => {
    cy.visit('/')

    AppTest.signIn.email.type('user@test.com')
    AppTest.signIn.password.type('password123')
    AppTest.signIn.signInButton.click()

    // CREATE & SHOW
    AppTest.taskPage.taskTableHead().should('be.visible')
    AppTest.taskPage.taskTableRow().should('have.length', 0)

    AppTest.taskPage.taskAddButton().click()
    AppTest.taskPage.taskNameInput().type('Task 1')
    AppTest.taskPage.taskDescriptionInput().type('Description 1')
    AppTest.taskPage.taskSaveButton().click()

    AppTest.taskPage.taskTableRow().should('have.length', 1)
    AppTest.taskPage.taskTableRow().eq(0).should('contain', 'Task 1')

    // UPDATE (Mark as done)
    AppTest.taskPage.taskMarkAsDoneButton().click()
    // expect to see a snackbar message
    AppTest.snackbarPage.snackbar().should('be.visible')
    AppTest.snackbarPage.snackbarMessage().should('contain', 'Task marked as done')

    // REMOVE
    AppTest.taskPage.taskRemoveButton().click()
    AppTest.snackbarPage.snackbar().should('be.visible')
    AppTest.snackbarPage.snackbarMessage().should('contain', 'Task removed successfully')
    AppTest.taskPage.taskTableRow().should('have.length', 0)
  })
})
