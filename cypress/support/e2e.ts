import './commands'

Cypress.on('uncaught:exception', () => {
  // the Bright site's cookie/analytics scripts throw errors
  return false
})