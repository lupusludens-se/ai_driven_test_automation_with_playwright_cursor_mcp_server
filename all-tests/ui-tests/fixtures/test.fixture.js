const base = require('@playwright/test');

exports.test = base.test.extend({
  // Add custom fixtures here
  page: async ({ page }, use) => {
    // Setup - runs before each test that uses this fixture
    await page.setViewportSize({ width: 1020, height: 1080 });

    // Use the fixture
    await use(page);

    // Cleanup - runs after each test that uses this fixture
    await page.close();
  },
});

exports.expect = base.expect; 