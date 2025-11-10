import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 15000,
  expect: {
    timeout: 15000,
  },
  testDir: './tests/e2e/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['blob', { outputDir: 'blob-report' }]] : 'html',
  use: {
    testIdAttribute: 'test-data',
    trace: 'retain-on-failure',
    video: 'off',
    screenshot: 'only-on-failure', // off, on
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
