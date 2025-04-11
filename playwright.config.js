// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './', // Include all test directories
  timeout: 30000, // Maximum time one test can run for
  retries: 1, // Retry failed tests once
  reporter: 'html', // Generate an HTML report
  use: {
    baseURL: 'http://localhost:3000', // Replace with your API's base URL
    headless: true, // Run tests in headless mode
    screenshot: 'only-on-failure', // Capture screenshots only on test failure
    video: 'retain-on-failure', // Record video only on test failure
  },
});
