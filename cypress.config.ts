import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://brightsg.com',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      ukUrl: 'https://brightsg.com/',
      irelandUrl: 'https://brightsg.com/en-ie/',
    },
  },
});