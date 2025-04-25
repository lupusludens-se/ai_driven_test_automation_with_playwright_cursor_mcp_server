require('dotenv').config();

const { test, expect } = require('@playwright/test');

test.describe('Cursor GitHub page tests', () => {
  const REPO_URL = 'https://github.com/upstash/context7';

  test('should verify contributors section', { tag: '@cursorGithub' }, async ({ page }) => {
    // Navigate and wait for initial load
    await test.step('Navigate to repository', async () => {
      await page.goto(REPO_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(REPO_URL);
    });

    // Verify contributors section exists
    await test.step('Verify contributors section', async () => {
      // Wait for the sidebar to be visible
      await page.waitForSelector('div[class*="Layout-sidebar"]');
      
      // Find contributors section using multiple possible selectors
      const contributorsSection = await page.locator('div[class*="BorderGrid-row"]:has-text("Contributors")').first();
      await expect(contributorsSection).toBeVisible();
    });

    // Check first contributor
    await test.step('Check first contributor', async () => {
      // Get all contributor avatars
      const contributors = await page.locator('a[data-hovercard-type="user"]').all();
      expect(contributors.length).toBeGreaterThan(0);

      // Click first contributor
      await contributors[0].click();
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
      
      // Verify URL contains expected username
      const currentUrl = page.url();
      expect(currentUrl).toContain('github.com/');
    });

    // Return to repository
    await test.step('Return to repository', async () => {
      await page.goto(REPO_URL);
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
    });

    // Check last contributor
    await test.step('Check last contributor', async () => {
      // Get updated list of contributors
      const contributors = await page.locator('a[data-hovercard-type="user"]').all();
      expect(contributors.length).toBeGreaterThan(0);

      // Click last contributor
      await contributors[contributors.length - 1].click();
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
      
      // Verify we're on a GitHub profile page
      const currentUrl = page.url();
      expect(currentUrl).toContain('github.com/');
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
}); 