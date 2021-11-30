describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('standard_user.json').as('standardUser')
  })

//LOGIN STANDARD USER
  it('should logged a user', () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url)
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('@standardUser').then((standardUser) => {
      cy.loginStandardUser(standardUser.username, standardUser.password)
    cy.wait(3000)
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})

