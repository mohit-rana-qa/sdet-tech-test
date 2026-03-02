**SDET Technical Test – Bright SG
**
**Overview
**
This solution expands the provided Cypress framework with:

Automated E2E test cases

Feature-based spec organisation

Lightweight Page Object Model (POM)

Custom Cypress commands

Improved stability handling for third-party script errors

Structured manual test cases in TEST_CASES.md

The goal was to keep the implementation clean, scalable, and maintainable within the 2-hour timebox.

Prerequisites

Node.js (v16+)

npm

Setup

Install dependencies:

npm install
Running Tests
Headless Mode
npm test
Interactive Mode
npm run cy:open

Select E2E Testing and choose your browser.

Project Structure
cypress/
├── e2e/
│   ├── homepage.cy.ts
│   ├── navigation.cy.ts
│   ├── productPages.cy.ts
│   ├── bookDemo.cy.ts
│   ├── footer.cy.ts
│   ├── locationPopup.cy.ts
│   └── responsive.cy.ts
│
├── pages/
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── DemoPage.ts
│   └── SupportPage.ts
│
├── support/
│   ├── commands.ts
│   └── e2e.ts
│
├── fixtures/
│   └── testData.json
│
└── selectors/
    └── popup.selectors.ts
Test Coverage Areas

Homepage content validation

Navigation and routing

Product pages validation

Footer links and content

Book Demo form behaviour

Location popup functionality

Responsive behaviour (multiple viewports)

Total: 32 automated tests

Design Decisions
Lightweight Page Object Model

Used to:

Avoid selector duplication

Improve readability

Keep tests maintainable

Kept intentionally minimal to avoid over-engineering within the timebox.

Custom Commands

Used only where reuse improved clarity (e.g., cookie handling and reusable flows).

Exception Handling

Handled known third-party script errors using:

Cypress.on('uncaught:exception', () => false)

This prevents analytics or cookie scripts from causing false test failures.
