import homePage from '../pages/HomePage'

describe('Navigation & Header', () => {
  beforeEach(() => {
    homePage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  it('displays the Bright logo in the header', () => {
    homePage.getLogo()
      .should('exist')
      .and('have.attr', 'src')
      .and('include', 'bright')
  })

  it('navigates to Book a Demo page from header CTA', () => {
    homePage.clickBookDemo()

    cy.url().should('include', '/product-demo')
    cy.waitForPageLoad()
    cy.get('body').should('contain.text', 'Demo')
  })

  it('opens the mega menu when hovering Software Solutions', () => {
    homePage.hoverSoftwareSolutions()

    cy.contains('BrightPay').should('exist')
    cy.contains('BrightManager').should('exist')
  })

  it('opens the search overlay when clicking the search icon', () => {
    homePage.openSearch()

    cy.get('#search-outer input, #search input, .search-form input')
      .should('exist')
  })

  it('navigates to a product page from the mega menu', () => {
    homePage.hoverSoftwareSolutions()

    cy.contains('a', 'BrightPay').click({ force: true })
    cy.url().should('include', 'brightpay')
    cy.waitForPageLoad()
  })
})