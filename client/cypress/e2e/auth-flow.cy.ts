describe('Authentication Module', () => {
  it('visits sign-up page and redirects to home', () => {
    cy.visit('/')

    // Redirect to sign-in page
    cy.url().should('include', '/auth/sign-in')

    // Create a new user
    cy.get('[data-testid="signup-link"]').click()
    cy.get('[data-testid="card-title"]').should('contain', 'Sign Up')

    cy.get('[data-testid="name-input"]').type('Mario')
    cy.get('[data-testid="last_name-input"]').type('Cuiza')
    cy.get('[data-testid="email-input"]').type('mario@test.com')
    cy.get('[data-testid="password-input"]').type('password123')

    cy.get('[data-testid="signup-button"]').click()

    // check if the user is redirected to the home page
    cy.get('[data-testid="home-title"]').should('contain', 'Home Page')
    cy.get('[data-testid="home-description"]').should('contain', 'Welcome to the home page: Mario')

    // check if the user is logged out
    cy.get('div[role="button"]').click()
    cy.get('a').contains('Log out').click()
    cy.url().should('include', '/auth/sign-in')
    cy.get('[data-testid="card-title"]').should('contain', 'Sign In')

    cy.get('[data-testid="email-input"]').type('mario@test.com')
    cy.get('[data-testid="password-input"]').type('password123')

    cy.get('[data-testid="signin-button"]').click()

    // check if the user is redirected to the home page
    cy.get('[data-testid="home-title"]').should('contain', 'Home Page')
    cy.get('[data-testid="home-description"]').should('contain', 'Welcome to the home page: Mario')
  })
})
