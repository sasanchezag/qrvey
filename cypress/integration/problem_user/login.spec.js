describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('users.json').as('loginProblemUser')
  })

//LOGIN PROBLEM USER
  it('should logged a user', () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url)
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('@loginProblemUser').then((loginProblemUser) => {
      cy.loginProblemUser(loginProblemUser.problem_username, loginProblemUser.password)
    cy.wait(3000)
    cy.get('.header_secondary_container').should('be.visible')
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
