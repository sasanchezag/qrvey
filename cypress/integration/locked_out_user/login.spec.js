describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('users.json').as('loginLockedUser')
  })

//LOGIN LOCKED USER
  it('should logged a user', () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url)
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('@loginLockedUser').then((loginLockedUser) => {
      cy.loginLockedUser(loginLockedUser.locked_out_username, loginLockedUser.password)
    cy.wait(3000)
    cy.get('.app_logo').should('be.visible')
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
