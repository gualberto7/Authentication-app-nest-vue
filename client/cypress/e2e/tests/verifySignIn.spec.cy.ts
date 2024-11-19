import signInPage from '../../pageObjects/signInPage'

describe('Login page test', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in')
  })

  it('should sign in successfully', () => {
    const signIn = new signInPage()
    signIn.email.type('mario@test.com')
    signIn.password.type('password123')
    signIn.signInButton.click()

    cy.get('[data-testid="home-title"]').should('contain', 'Home Page')
  })

  it('should display error message when credentials are incorrect', () => {
    const signIn = new signInPage()
    signIn.email.type('mario@test.com')
    signIn.password.type('invalid-password')
    signIn.signInButton.click()

    cy.get('[data-testid="error-message"]').should('contain', 'Invalid credentials')
  })
})
