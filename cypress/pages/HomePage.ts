class HomePage {
  // selectors
  private readonly logo = 'header#top img[src*="bright"]'
  private readonly bookDemoBtn = 'header#top a[href*="product-demo"]'
  private readonly searchIcon = '#search-btn a, a[href="#searchbox"]'
  private readonly searchInput = '#search input, .search-form input'
  private readonly heroHeading = 'h1, h2'
  private readonly megaMenuTrigger = 'header#top .sf-menu > li:first-child > a'
  private readonly megaMenuDropdown = '.sf-mega'
  private readonly footer = '#footer-outer, footer'

  visit() {
    cy.visit('/')
    return this
  }

  getLogo() {
    return cy.get(this.logo).first()
  }

  clickBookDemo() {
    cy.get(this.bookDemoBtn).filter(':visible').first().click({ force: true })
    return this
  }

  openSearch() {
    cy.get(this.searchIcon).first().click({ force: true })
    return this
  }

  typeSearchQuery(query: string) {
    cy.get(this.searchInput).should('be.visible').type(query)
    return this
  }

  submitSearch() {
    cy.get(this.searchInput).type('{enter}')
    return this
  }

  getHeroHeading() {
    return cy.get(this.heroHeading).first()
  }

  hoverSoftwareSolutions() {
    cy.get(this.megaMenuTrigger).first().trigger('mouseenter', { force: true })
    return this
  }

  getMegaMenuDropdown() {
    return cy.get(this.megaMenuDropdown)
  }

  getFooter() {
    return cy.get(this.footer)
  }

  scrollToFooter() {
    cy.get(this.footer).scrollIntoView()
    return this
  }
}

export default new HomePage()