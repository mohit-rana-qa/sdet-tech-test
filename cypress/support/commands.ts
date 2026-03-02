/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      dismissLocationPopup(): Chainable<void>
      acceptCookies(): Chainable<void>
      shouldHaveValidHref(): Chainable<JQuery<HTMLElement>>
      verifyNoImagesBroken(): Chainable<void>
      waitForPageLoad(): Chainable<void>
      verifyElementVisible(selector: string): Chainable<void>
    }
  }
}

// original command from the repo
Cypress.Commands.add('verifyElementVisible', (selector: string) => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('dismissLocationPopup', () => {
  // the site uses a fancybox overlay for the location picker
 
  cy.get('body').then(($body) => {
    const hasFancybox = $body.find('.fancybox-slide--current').length > 0
    const hasNectarPopup = $body.find('.nectar-box-roll').length > 0

    if (hasFancybox) {
      // try clicking the UK link inside the fancybox
      const ukLink = $body.find('.fancybox-slide--current a[href="https://brightsg.com/"]')
      if (ukLink.length > 0) {
        cy.wrap(ukLink.first()).click({ force: true })
      } else {
        // try the "United Kingdom" text link
        cy.get('.fancybox-slide--current').contains('United Kingdom').click({ force: true })
      }
      // wait for the popup to close
      cy.get('.fancybox-slide--current', { timeout: 5000 }).should('not.exist')
    } else if (hasNectarPopup) {
      const ukLink = $body.find('a[href="https://brightsg.com/"]')
      if (ukLink.length > 0) {
        cy.wrap(ukLink.first()).click({ force: true })
      }
    }
  })
})

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    const selectors = [
      '#onetrust-accept-btn-handler',
      '[class*="cookie-accept"]',
      '[class*="cookie-consent"] button',
      '.cookie-banner button'
    ]

    for (const selector of selectors) {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click({ force: true })
        return
      }
    }
  })
})

Cypress.Commands.add(
  'shouldHaveValidHref',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject).each(($link) => {
      const href = $link.attr('href')
      if (!href) return
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return
      if (href === '#' || href === '') return

      const baseUrl = Cypress.config('baseUrl') || ''
      const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href}`

      cy.request({
        url: fullUrl,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status, `Link ${href} should not be broken`).to.be.lessThan(400)
      })
    })
  }
)

Cypress.Commands.add('verifyNoImagesBroken', () => {
  cy.get('img').each(($img) => {
    const src = $img.attr('src') || ''
    if (!src || src.startsWith('data:image/svg')) return

    cy.wrap($img).should(($el) => {
      const imgEl = $el[0] as HTMLImageElement
      expect(imgEl.naturalWidth, `Image ${src} should load properly`).to.be.greaterThan(0)
    })
  })
})

Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete')
})

export {}