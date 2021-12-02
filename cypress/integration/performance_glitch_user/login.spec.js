describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('users.json').as('performanceGlitchUser')
  })

//LOGIN PERFORMANCE USER
  it('should logged a user', () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url)
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('@performanceGlitchUser').then((performanceGlitchUser) => {
      cy.performanceGlitchUser(performanceGlitchUser.performance_glitch_username, performanceGlitchUser.password)
    cy.wait(3000)
    cy.get('.header_secondary_container').should('be.visible')
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
