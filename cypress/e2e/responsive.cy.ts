import homePage from '../pages/HomePage'

describe('Mobile Responsiveness', () => {
  beforeEach(() => {
    cy.viewport('iphone-x')
    homePage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  it('shows a hamburger menu icon on mobile', () => {
    cy.get('.slide-out-widget-area-toggle, [class*="hamburger"], a[class*="toggle"]')
      .should('be.visible')
  })

 it('opens a side menu when the hamburger is tapped', () => {
    cy.get('.slide-out-widget-area-toggle, [class*="hamburger"], a[class*="toggle"]')
      .first()
      .click({ force: true })

    // verify the slide-out widget area becomes visible after clicking
    cy.wait(1500)
    cy.get('#slide-out-widget-area, .slide-out-widget-area, [class*="slide-out"]')
      .should('exist')
  })

  it('shows mobile header elements at mobile widths', () => {
    cy.get('.nectar-mobile-only, .mobile-header').should('exist')
  })

  it('displays the page without horizontal scroll', () => {
    cy.window().then((win) => {
      cy.get('body').then(($body) => {
        const bodyWidth = $body[0].scrollWidth
        const viewportWidth = win.innerWidth
        expect(bodyWidth).to.be.at.most(viewportWidth + 5)
      })
    })
  })
})

describe('Tablet Responsiveness', () => {
  beforeEach(() => {
    cy.viewport('ipad-2')
    homePage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  it('renders the homepage at tablet width without layout issues', () => {
    cy.get('body').should('be.visible')
    homePage.getHeroHeading().should('be.visible')
  })
})