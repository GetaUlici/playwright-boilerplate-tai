import { test, expect } from '../../base';
const baseUrl = `${process.env.BASE_URL}`;

test.describe('User actions test suite', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(`${baseUrl}`);
    await loginPage.doLogin();
  });

  test('logout test @smoke', async ({ page, leftSideMenuPage }) => {
    await leftSideMenuPage.logoutBtn.click();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
  });
});
