const { test, expect } = require('@playwright/test');

test.describe('Sunny Admin Login Test', () => {
    test('should log in and verify Sunny Admin', async ({ page }) => {
        // Step 1: Navigate to the dashboard using URL from environment variable
        await page.goto(process.env.UI_BASE_URL);

        // Step 2: Click on the Log In button
        await page.click('text=Log In');

        // Wait for navigation to complete
        await page.waitForNavigation({ waitUntil: 'networkidle' });

        // Step 3: Enter email address from environment variable
        await page.fill('input[name="Email Address"]', process.env.TEST_ADMIN_USERNAME);

        // Step 4: Enter password from environment variable
        await page.fill('input[name="Password"]', process.env.PASSWORD);

        // Step 5: Click on the Sign In button
        await page.click('button[id="next"]');

        // Step 6: Verify Sunny Admin is on the page
        const adminText = await page.locator('text=Sunny Admin');
        await expect(adminText).toBeVisible();

        // Pause the test for debugging
        await page.pause();

        // Step 7: Navigate back to the dashboard
        await page.goto(process.env.UI_BASE_URL);

        // Step 8: Close the browser
        await page.context().close();
    });
});
