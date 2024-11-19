class TaskPage {
  taskNameInput() {
    return cy.get('[data-testid="title"]')
  }

  taskDescriptionInput() {
    return cy.get('[data-testid="description"]')
  }

  taskSaveButton() {
    return cy.get('[data-testid="save-task-button"]')
  }

  taskAddButton() {
    return cy.get('[data-testid="add-task-button"]')
  }

  taskRemoveButton() {
    return cy.get('[data-testid="remove-task-button"]')
  }

  taskTableHead() {
    return cy.get('[data-testid="table-head"]')
  }

  taskTableRow() {
    return cy.get('[data-testid="table-body-row"]')
  }

  taskMarkAsDoneButton() {
    return cy.get('[data-testid="mark-as-done-checkbox"]')
  }
}

export default TaskPage
