class DemoPage {
  private readonly pageHeading = 'h1, h2, .entry-title'
  private readonly demoForm = 'form, iframe[src*="hubspot"], iframe[src*="calendly"], .hs-form'
  private readonly nameInput = 'input[name*="name"], input[name*="first"]'
  private readonly emailInput = 'input[name*="email"]'
  private readonly submitBtn = 'input[type="submit"], button[type="submit"]'

  visit() {
    cy.visit('/product-demo/')
    return this
  }

  getHeading() {
    return cy.get(this.pageHeading).first()
  }

  getForm() {
    return cy.get(this.demoForm).first()
  }

  hasFormOrEmbed() {
    return cy.get('form, iframe').should('exist')
  }
}

export default new DemoPage()
