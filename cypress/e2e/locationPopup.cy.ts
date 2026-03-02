describe('Location Popup', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('displays the location popup on first visit', () => {
    cy.visit('/')
    cy.get('.fancybox-slide--current', { timeout: 10000 }).should('be.visible')
  })

  it('navigates to the UK site when UK is selected', () => {
    cy.visit('/')
    cy.get('.fancybox-slide--current', { timeout: 10000 }).should('be.visible')

    cy.get('.fancybox-slide--current a[href="https://brightsg.com/"]')
      .first()
      .click({ force: true })

    cy.url().should('include', 'brightsg.com')
    cy.url().should('not.include', '/en-ie/')
  })

  it('navigates to the Ireland site when Ireland is selected', () => {
    cy.visit('/')
    cy.get('.fancybox-slide--current', { timeout: 10000 }).should('be.visible')

    cy.get('.fancybox-slide--current a[href*="/en-ie/"]')
      .first()
      .click({ force: true })

    cy.url().should('include', '/en-ie/')
  })

  it('does not show the popup again after a selection has been made', () => {
    cy.visit('/')
    cy.get('.fancybox-slide--current', { timeout: 10000 }).should('be.visible')

    cy.get('.fancybox-slide--current a[href="https://brightsg.com/"]')
      .first()
      .click({ force: true })

    // revisit - popup shouldn't appear again
    cy.visit('/')
    cy.wait(2000)

    cy.get('body').then(($body) => {
      const popupVisible = $body.find('.fancybox-slide--current:visible').length
      expect(popupVisible).to.equal(0)
    })
  })
})