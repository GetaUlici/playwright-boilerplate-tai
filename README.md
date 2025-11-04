# 🚀 Playwright Test Automation Boilerplate

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![Playwright](https://img.shields.io/badge/Playwright-%5E1.48-blue?logo=playwright)
![Build Status](https://img.shields.io/github/actions/workflow/status/GetaUlici/playwright-boilerplate-tai/playwright.yml?branch=main)
![Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)

A **modern test automation boilerplate** built with [Playwright](https://playwright.dev).
It supports **End-to-End (E2E)**, **API**, **Visual**, and **Accessibility (A11Y)** testing — all in a unified, modular setup.
By default, it’s configured to test the [Sauce Demo](https://www.saucedemo.com/) website, but can easily be adapted to any application.

---

## ✨ Features

✅ End-to-End (E2E) Testing
✅ API Testing with Schema Validation
✅ Visual Regression Testing
✅ Accessibility (A11Y) Testing
✅ Page Object Model (POM) Architecture
✅ Cross-Browser Testing (Chromium, Firefox, WebKit)
✅ Parallel Test Execution
✅ HTML Test Reports
✅ CI/CD Integration Ready

---

## 🧱 Project Structure

```
├── data/                 # Test data and API schemas
├── lib/                  # Utility functions and helpers
├── pages/                # Page Object Models
├── tests/                # Test suites
│   ├── a11y/             # Accessibility tests
│   ├── api/              # API tests
│   ├── e2e/              # End-to-End tests
│   └── visual/           # Visual regression tests
├── playwright-report/    # Test execution reports
└── test-results/         # Test artifacts (screenshots, traces)
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- npm (comes with Node.js)

---

## 📦 Installation

1. **Clone** the repository:

   ```bash
   git clone https://github.com/GetaUlici/playwright-boilerplate-tai.git
   cd playwright-boilerplate-tai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

---

## 🧪 Available Scripts

| Command                         | Description                                |
| ------------------------------- | ------------------------------------------ |
| `npm test`                      | Run **End-to-End (E2E)** tests (default)   |
| `npm run test:visual`           | Run **Visual Regression** tests            |
| `npm run test:api`              | Run **API** tests                          |
| `npm run test:a11y`             | Run **Accessibility (A11Y)** tests         |
| `npm run test:headed`           | Run tests in headed mode                   |
| `npm run test:single:thread`    | Run tests sequentially (single thread)     |
| `npm run open:report`           | Open the HTML test report                  |
| `npm run test:filter-by-tag`    | Run tests filtered by tag (e.g., `@smoke`) |
| `npm run test:project:firefox`  | Run tests specifically in Firefox          |
| `npm run test:ten:times`        | Run all tests 10 times                     |
| `npm run run:last:failed:tests` | Re-run only failed tests                   |
| `npm run open:user-interface`   | Open Playwright UI mode                    |
| `npm run record`                | Start Playwright’s Codegen tool            |
| `npm run format`                | Format code with Prettier                  |


---

## 🧩 Test Types

### 🔹 End-to-End (E2E) Tests

- Location: `tests/e2e/`
- Validate complete user flows using the **Page Object Model (POM)** pattern.

### 🔹 API Tests

- Location: `tests/api/`
- Validate API endpoints with **schema validation** using [`playwright-schema-validator`](https://www.npmjs.com/package/playwright-schema-validator).

### 🔹 Visual Regression Tests

- Location: `tests/visual/`
- Compare screenshots to detect unintended UI changes.

### 🔹 Accessibility (A11Y) Tests

- Location: `tests/a11y/`
- Identify accessibility issues using [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright).

---

## ⚙️ Configuration

The project includes separate Playwright configs for each test type:

- `playwright.config.ts` — Main configuration
- `playwright.visual.config.ts` — Visual testing
- `playwright.a11y.config.ts` — Accessibility testing
- `playwright.api.config.ts` — API testing

### 🌐 Environment Variables

Environment variables are handled via [`cross-env`](https://www.npmjs.com/package/cross-env).
Default base URL:

```
https://www.saucedemo.com/
```

You can override this via CLI or `.env` file.

---

## ⚡ Quick Start Example

Here’s a simple **E2E test example** using Playwright and the Page Object Model:

```typescript
// tests/e2e/user-actions.spec.ts
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
```

**Login Page Object Example:**

```typescript
// pages/login-page.ts
import { expect, Locator, Page } from '@playwright/test';
import 'dotenv/config';

export class LoginPage {
  page: Page;
  usernameField: Locator;
  pswField: Locator;
  loginBtn: Locator;
  logo: Locator;
  hamburgerMenu: Locator;
  logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.pswField = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.logo = page.getByText('Swag Labs');
    this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
  }

  async doLogin(
    username: string = `${process.env.USERNAME}`,
    password: string = `${process.env.PSW}`
  ) {
    await this.usernameField.fill(username);
    await this.pswField.fill(password);
    await this.loginBtn.click();
    await expect(this.logo).toBeVisible();
    await this.hamburgerMenu.click();
    await expect(this.logoutBtn).toBeVisible();
  }
}
```

Run it:

```bash
# Run End-to-End tests
npm test

# Run Visual Regression tests
npm run test:visual

# Run API tests
npm run test:api

# Run Accessibility (A11Y) tests
npm run test:a11y
```


---

## 🔁 CI/CD Integration

This framework is CI-ready, supporting:

- Retry logic for flaky tests
- Parallel execution
- Artifacts (screenshots, traces, and reports)
- HTML reporting

Easily integrate with **GitHub Actions**, **Jenkins**, or **Azure Pipelines**.

---

## 📦 Dependencies

### Main

- [`@playwright/test`](https://playwright.dev/)
- [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright)
- [`@faker-js/faker`](https://www.npmjs.com/package/@faker-js/faker)
- [`playwright-schema-validator`](https://www.npmjs.com/package/playwright-schema-validator)
- [`zod`](https://www.npmjs.com/package/zod)

### Dev

- [`cross-env`](https://www.npmjs.com/package/cross-env)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`prettier`](https://prettier.io/)
