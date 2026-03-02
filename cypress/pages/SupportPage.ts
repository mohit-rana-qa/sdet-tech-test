class SupportPage {
  private readonly pageHeading = 'h1, .entry-title, .page-header h1'
  private readonly supportLinks = '.support-links a, .wpb_wrapper a, .row a'
  private readonly searchInput = 'input[type="search"], input[type="text"]'
  private readonly contactSection = '[class*="contact"], .contact-info'

  visit() {
    cy.visit('/support/')
    return this
  }

  getHeading() {
    return cy.get(this.pageHeading).first()
  }

  getLinks() {
    return cy.get(this.supportLinks)
  }
}

export default new SupportPage()
