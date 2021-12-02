describe('Logout process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('users.json').as('loginProblemUser')
  })

//LOGOUT PROBLEM USER
  it('should logged a user', () => {
    let url = Cypress.config().baseUrl;
    cy.visit(url)
    cy.get('[data-test="username"]').should('be.visible')
    cy.get('[data-test="password"]').should('be.visible')
    cy.get('@loginProblemUser').then((loginProblemUser) => {
      cy.loginProblemUser(loginProblemUser.problem_username, loginProblemUser.password)
    cy.wait(3000)

    //LOGOUT PROBLEM USER
    cy.get('#react-burger-menu-btn').should('be.visible')
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').should('be.visible')
    cy.get('#logout_sidebar_link').click()
    cy.get('.login_logo').should('be.visible')
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
