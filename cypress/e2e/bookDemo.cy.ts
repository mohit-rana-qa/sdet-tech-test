import demoPage from '../pages/DemoPage'

describe('Book a Demo Page', () => {
  beforeEach(() => {
    demoPage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  it('loads the demo page successfully', () => {
    cy.url().should('include', '/product-demo')
  })

  it('displays a heading related to demos', () => {
    demoPage.getHeading()
      .should('be.visible')
      .invoke('text')
      .should('have.length.greaterThan', 3)
  })

  it('contains a form or booking embed', () => {
    // the demo page should have either an inline form or
    // an embedded iframe (e.g. HubSpot, Calendly)
    demoPage.hasFormOrEmbed()
  })
})
