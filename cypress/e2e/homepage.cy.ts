import homePage from '../pages/HomePage'

describe('Homepage', () => {
  beforeEach(() => {
    homePage.visit()
    cy.dismissLocationPopup()
    cy.acceptCookies()
    cy.waitForPageLoad()
  })

  describe('Hero Section', () => {
    it('displays a visible heading in the hero area', () => {
      homePage.getHeroHeading()
        .should('be.visible')
        .invoke('text')
        .should('have.length.greaterThan', 5)
    })

    it('contains at least one CTA link in the hero', () => {
      cy.get('a[href*="demo"], a[href*="product"], a[href*="trial"]')
        .filter(':visible')
        .should('have.length.greaterThan', 0)
    })

    it('has no broken images on the homepage', () => {
      cy.get('img').each(($img) => {
        const src = $img.attr('src') || ''
        // skip base64 placeholders, tracking pixels, and analytics tags
        if (!src || src.startsWith('data:image/svg')) return
        if (src.includes('bat.bing.net')) return
        if (src.includes('facebook.com')) return
        if (src.includes('google-analytics')) return
        if (src.includes('doubleclick')) return
        if (src.includes('action/0')) return

        cy.wrap($img).should(($el) => {
          const imgEl = $el[0] as HTMLImageElement
          expect(imgEl.naturalWidth, `Image ${src} should load properly`).to.be.greaterThan(0)
        })
      })
    })
  })

  describe('Page Performance', () => {
    it('loads within an acceptable time frame', () => {
      const start = Date.now()
      cy.visit('/')
      cy.waitForPageLoad().then(() => {
        const loadTime = Date.now() - start
        expect(loadTime).to.be.lessThan(30000)
      })
    })
  })
})