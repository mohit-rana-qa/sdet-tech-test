# SDET Technical Test

Cypress + TypeScript test suite for [brightsg.com](https://brightsg.com).

## Setup

```bash
npm install
```

## Running Tests

```bash
# headless
npm test

# interactive
npm run cy:open

# single spec
npx cypress run --spec cypress/e2e/navigation.cy.ts
```

I'd recommend using Chrome in interactive mode — Electron can be a bit flaky with the site's fancybox overlays.

## What I Tested

I focused on the areas that matter most from a user/conversion perspective — can someone land on the site, find a product, and get to the demo booking page without issues?

- **Navigation** – logo renders, mega menu works on hover, Book a Demo CTA goes to the right page, search opens
- **Product pages** – BrightPay, BrightManager, BrightBooks all load with correct titles, CTAs present, no broken images
- **Homepage** – hero section has a heading and CTA, images load fine, basic page load time check
- **Footer** – privacy policy and terms links exist, sampled links aren't returning 404s
- **Location popup** – the UK/Ireland selector shows on first visit, selecting either option works, doesn't keep showing up after you've picked
- **Book a Demo** – page loads, has a heading, form/embed is present
- **Responsive** – hamburger menu shows on mobile, no horizontal overflow, tablet renders okay

32 tests across 7 spec files.

## Project Structure

```
cypress/
├── e2e/                  # test specs
├── pages/                # page objects (HomePage, ProductPage, DemoPage, SupportPage)
├── support/
│   ├── commands.ts       # custom commands
│   └── e2e.ts            # global config + uncaught exception handling
└── fixtures/
    └── testData.json     # product slugs, search terms
```

I used a **Page Object Model** to keep the selectors out of the specs. Makes it easier to update if the site changes — you only fix the selector in one place.

**Custom commands** I added:
- `dismissLocationPopup()` — the site has a fancybox overlay that blocks everything until you pick UK or Ireland, so this handles it in beforeEach
- `acceptCookies()` — deals with the OneTrust cookie banner
- `verifyNoImagesBroken()` — checks images actually loaded (skips tracking pixels from Bing/Facebook which are invisible 1x1s)
- `waitForPageLoad()` — waits for document ready state

## Things Worth Noting

The site is a WordPress build using the Nectar theme, which threw up a few quirks:

- The location popup is a fancybox overlay that covers the entire page, so a few interactions need `{ force: true }` to get past it
- Third-party scripts (OneTrust, GTM, Bing tracking) throw uncaught JS errors that aren't related to the site itself — I'm suppressing those globally so they don't fail tests
- Page load times can be slow (~15-25s) because of all the analytics scripts, so `pageLoadTimeout` is set to 30s and I've got one retry enabled for headless runs
- The broken image check filters out tracking pixels (bat.bing.net, doubleclick etc.) since those are invisible 1x1 images that always report naturalWidth of 0

## Test Cases

See [TEST CASES.md](https://github.com/mohit-rana-qa/sdet-tech-test/blob/main/cypress/TEST_CASES.md) for the manual test case designs (Part A).
