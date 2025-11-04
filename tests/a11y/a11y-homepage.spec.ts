import { test, expect } from '../../base';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('User authentication test suite', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(`${baseUrl}`);
    await loginPage.doLogin();
  });

  test('a11y test on homepage - v1', async ({ page }) => {
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await page.waitForTimeout(5000);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('a11y test on homepage - v2, with custom steps', async ({ page }, testInfo) => {
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await page.waitForTimeout(5000);

    await test.step('check accessibility', async () => {
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .withRules(['color-contrast'])
        .analyze();

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });

      expect(violations).toHaveLength(0);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
