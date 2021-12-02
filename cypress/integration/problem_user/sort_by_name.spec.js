describe('Sort by name', () => {
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

    //CHECK SORT ELEMENT (Z to A)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Name (Z to A)')
    cy.wait(2000)
    cy.get('.active_option').contains('Name (Z to A)')
    cy.get('#item_3_title_link').should('have.length', 1)
    })

    //CHECK SORT ELEMENT (A to Z)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Name (A to Z)')
    cy.wait(2000)
    cy.get('.active_option').contains('Name (A to Z)')
    cy.get('#item_4_title_link').should('have.length', 1)
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
