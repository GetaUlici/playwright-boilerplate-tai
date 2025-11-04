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
