import homePage from '../pages/HomePage'

describe('Footer', () => {
  beforeEach(() => {
    homePage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  it('is visible when scrolled to the bottom', () => {
    homePage.scrollToFooter()
    homePage.getFooter().should('be.visible')
  })

  it('contains a Privacy Policy link', () => {
    homePage.scrollToFooter()

    cy.get('#footer-outer a[href*="privacy"], footer a[href*="privacy"]')
      .should('exist')
      .and('have.attr', 'href')
      .and('not.be.empty')
  })

  it('contains a Terms link', () => {
    homePage.scrollToFooter()

    cy.get('#footer-outer, footer').within(() => {
      cy.get('a').then(($links) => {
        const termsLink = $links.toArray().find((el) =>
          el.textContent?.toLowerCase().includes('terms')
        )
        expect(termsLink, 'Footer should have a terms link').to.not.be.undefined
      })
    })
  })

  it('has footer links that return valid responses', () => {
    homePage.scrollToFooter()

    // pick a small sample of footer links to check, not all of them
    // otherwise this test takes longg
    cy.get('#footer-outer a, footer a')
      .filter('[href]')
      .then(($links) => {
        // test the first 5 non-trivial links
        const linksToCheck = $links.toArray()
          .filter((el) => {
            const href = el.getAttribute('href') || ''
            return href.startsWith('http') || href.startsWith('/')
          })
          .slice(0, 5)

        linksToCheck.forEach((link) => {
          const href = link.getAttribute('href')!
          const fullUrl = href.startsWith('http') ? href : `${Cypress.config('baseUrl')}${href}`

          cy.request({ url: fullUrl, failOnStatusCode: false }).then((resp) => {
            expect(resp.status, `Footer link ${href}`).to.be.lessThan(400)
          })
        })
      })
  })
})
