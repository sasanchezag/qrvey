describe('Sort by Price', () => {
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

    //CHECK SORT BY PRICE Price (low to high)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
    cy.wait(2000)
    cy.get('[data-test="product_sort_container"]').contains('Price (low to high)')
    cy.get('#item_2_title_link').should('have.length', 1)
    })

    //CHECK SORT BY PRICE Price (high to low)
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('[data-test="product_sort_container"]').select('Price (high to low)')
    cy.wait(2000)
    cy.get('[data-test="product_sort_container"]').contains('Price (high to low)')
    cy.get('#item_4_title_link').should('have.length', 1)
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
