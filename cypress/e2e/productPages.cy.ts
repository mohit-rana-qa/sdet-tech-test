import productPage from '../pages/ProductPage'

describe('Product Pages', () => {
  beforeEach(() => {
    cy.dismissLocationPopup()
    cy.acceptCookies()
  })

  describe('BrightPay', () => {
    beforeEach(() => {
      productPage.visitBrightPay()
      cy.waitForPageLoad()
    })

    it('has the correct page title', () => {
      productPage.getPageTitle().should('include', 'BrightPay')
    })

    it('displays a main heading on the page', () => {
      productPage.getMainHeading()
        .should('be.visible')
        .invoke('text')
        .should('have.length.greaterThan', 0)
    })

    it('shows at least one call-to-action button', () => {
      productPage.getCTAButtons().should('have.length.greaterThan', 0)
      productPage.getCTAButtons().first().should('be.visible')
    })

    it('has no broken images', () => {
      cy.verifyNoImagesBroken()
    })
  })

  describe('BrightManager', () => {
    beforeEach(() => {
      productPage.visitBrightManager()
      cy.waitForPageLoad()
    })

    it('loads the page without errors', () => {
      cy.get('body').should('be.visible')
      productPage.getPageTitle().should('include', 'BrightManager')
    })

    it('has at least one CTA', () => {
      productPage.getCTAButtons().should('have.length.greaterThan', 0)
    })
  })

  describe('BrightBooks', () => {
    beforeEach(() => {
      productPage.visitBrightBooks()
      cy.waitForPageLoad()
    })

    it('loads the page without errors', () => {
      cy.get('body').should('be.visible')
      productPage.getPageTitle().should('include', 'BrightBooks')
    })
  })
})
