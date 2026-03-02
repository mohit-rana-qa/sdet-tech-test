class ProductPage {
  private readonly pageTitle = 'head title'
  private readonly mainHeading = 'h1, .main-content h1, .entry-title'
  private readonly ctaButtons = '.nectar-button, a.btn, a[class*="cta"], a[href*="trial"], a[href*="buy"], a[href*="demo"]'
  private readonly featureSection = '.row .col, .wpb_wrapper, .feature-section'
  private readonly allImages = 'img'
  private readonly pricingSection = '.pricing, [class*="pricing"], [class*="price"]'
  private readonly breadcrumb = '.breadcrumb, [class*="breadcrumb"]'

  visitBrightPay() {
    cy.visit('/brightpay-cloud-payroll-software/')
    return this
  }

  visitBrightManager() {
    cy.visit('/brightmanager-accounting-practice-management-software/')
    return this
  }

  visitBrightBooks() {
    cy.visit('/brightbooks-cloud-based-bookkeeping-software/')
    return this
  }

  visitBySlug(slug: string) {
    cy.visit(`/${slug}/`)
    return this
  }

  getPageTitle() {
    return cy.title()
  }

  getMainHeading() {
    return cy.get(this.mainHeading).first()
  }

  getCTAButtons() {
    return cy.get(this.ctaButtons)
  }

  getImages() {
    return cy.get(this.allImages)
  }

  verifyNoBrokenImages() {
    cy.get(this.allImages).each(($img) => {
      const src = $img.attr('src') || ''
      // skip base64 placeholder svgs and empty srcs
      if (!src || src.startsWith('data:image/svg')) return

      cy.wrap($img).should(($el) => {
        const naturalWidth = ($el[0] as HTMLImageElement).naturalWidth
        expect(naturalWidth, `Image ${src} should have loaded`).to.be.greaterThan(0)
      })
    })
    return this
  }
}

export default new ProductPage()
