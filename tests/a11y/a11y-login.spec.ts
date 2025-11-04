import { test, expect } from '../../base';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = `${process.env.BASE_URL}`;

test.describe('A11y test suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
  });

  test('a11y test on login page - v1', async ({ page }) => {
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toContainText('Login');
    await page.waitForTimeout(5000);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast', 'select-name'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('a11y test on login page - v2, with custom steps', async ({ page }, testInfo) => {
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toContainText('Login');
    await page.waitForTimeout(5000);

    await test.step('check accessibility', async () => {
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .withRules(['color-contrast', 'select-name'])
        .analyze();

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(violations, null, 2),
        contentType: 'application/json',
      });

      expect(violations).toHaveLength(0);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast', 'select-name'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
