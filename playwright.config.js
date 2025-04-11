// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './', // Include all test directories
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Maximum time one test can run for. */
  timeout: 350000,
  reporter: process.env.CI ? 'html' : 'list',
  outputDir: 'test-results',
  expect: {
    timeout: 35000,
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 80,
      maxDiffPixelRatio: 0.2
    }
  },
  use: {
    baseURL: process.env.API_BASE_URL,
    launchOptions: {
      args: ['--disable-cache'] // disable cache. Allows to pull data directly from server
    },
    actionTimeout: 10000,
    navigationTimeout: 10000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
    locale: 'en-US',
    timezoneId: 'Asia/Kolkata',
    permissions: ['geolocation'],
    viewport: { width: 908, height: 720 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
