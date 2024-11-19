import signUpPage from '../../pageObjects/signUpPage'

describe('Login page test', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in')
  })

  it('should sign up successfully', () => {
    const signIn = new signUpPage()

    signIn.signUpLink.click()
    signIn.name.type('Mario')
    signIn.last_name.type('Test')
    signIn.email.type('mario1@test.com')
    signIn.password.type('password123')
    signIn.signUpButton.click()

    cy.get('[data-testid="home-title"]').should('contain', 'Home Page')
  })
})
