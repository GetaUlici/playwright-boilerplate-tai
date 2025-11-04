import { test, expect } from '../../base';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('Visual test on homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
  });

  test('visual test on homepage', async ({ page }) => {
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await page.waitForTimeout(5000);
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
    });
  });
});
