class SnackbarPage {
  public snackbar() {
    return cy.get('[data-testid="snackbar"]')
  }

  public snackbarMessage() {
    return cy.get('[data-testid="snackbar-message"]')
  }
}

export default SnackbarPage
