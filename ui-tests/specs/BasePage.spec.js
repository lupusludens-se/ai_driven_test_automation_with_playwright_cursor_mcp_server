require('dotenv').config();

const { test, expect } = require('@playwright/test');

test('BasePage test', { tag: '@basePage' }, async ({ page }) => {
  await page.goto(process.env.UI_BASE_URL);
  await expect(page).toHaveTitle(/Zeigo Network/);
});
