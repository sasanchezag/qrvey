describe('Sort by name', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('users.json').as('standardUser')
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

    //CHECK SORT ELEMENT (Z to A)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Name (Z to A)')
    cy.wait(2000)
    cy.get('[data-test="product_sort_container"]').contains('Name (Z to A)')
    cy.get('#item_3_title_link').should('have.length', 1)
    })

    //CHECK SORT ELEMENT (A to Z)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Name (A to Z)')
    cy.wait(2000)
    cy.get('[data-test="product_sort_container"]').contains('Name (A to Z)')
    cy.get('#item_4_title_link').should('have.length', 1)
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
