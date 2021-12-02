describe('Add products', () => {
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

    //CHECK ADD TO CART
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('.shopping_cart_badge').contains('6')
    cy.wait(3000)
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
