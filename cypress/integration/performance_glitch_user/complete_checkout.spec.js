describe('Complete checkout', () => {
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
    cy.get('.app_logo').should('be.visible')

    //ADD TO CART
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible')
    cy.get('#add-to-cart-sauce-labs-fleece-jacket').click()
    cy.get('#add-to-cart-sauce-labs-backpack').click()
    cy.get('#add-to-cart-sauce-labs-bike-light').click()
    cy.get('#add-to-cart-sauce-labs-bolt-t-shirt').click()
    cy.get('#add-to-cart-sauce-labs-onesie').click()
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
    cy.get('.shopping_cart_badge').contains('6')
    cy.wait(3000)

    //COMPLETE CHECKOUT
    cy.get('.shopping_cart_link').click()
    cy.get('.title').contains('Your Cart')
    cy.get('[data-test="checkout"]').should('be.visible')
    cy.get('[data-test="checkout"]').click()
    cy.wait(2000)
    cy.get('.title').contains('Checkout: Your Information')
    cy.get('#first-name').should('be.visible')
    cy.get('#last-name').should('be.visible')
    cy.get('#postal-code').should('be.visible')
    cy.get('#first-name').type('Santiago')
    cy.get('#last-name').type('Sanchez')
    cy.get('#postal-code').type('17001')
    cy.get('#continue').click()
    cy.wait(2000)
    cy.get('.title').contains('Checkout: Overview')
    cy.get('#finish').click()

    //THANKS PAGE
    cy.get('.title').contains('Checkout: Complete!')
    cy.get("h2").contains("THANK YOU FOR YOUR ORDER")
    cy.get('.complete-text').contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    cy.get('#back-to-products').should('be.visible')
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
