class signUpPage {
  get name() {
    return cy.get('[data-testid="name-input"]')
  }

  get last_name() {
    return cy.get('[data-testid="last_name-input"]')
  }

  get email() {
    return cy.get('[data-testid="email-input"]')
  }

  get password() {
    return cy.get('[data-testid="password-input"]')
  }

  get signUpButton() {
    return cy.get('[data-testid="signup-button"]')
  }

  get signUpLink() {
    return cy.get('[data-testid="signup-link"]')
  }
}

export default signUpPage
