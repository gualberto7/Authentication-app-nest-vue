class signPage {
  get email() {
    return cy.get('[data-testid="email-input"]')
  }

  get password() {
    return cy.get('[data-testid="password-input"]')
  }

  get signInButton() {
    return cy.get('[data-testid="signin-button"]')
  }
}

export default signPage
