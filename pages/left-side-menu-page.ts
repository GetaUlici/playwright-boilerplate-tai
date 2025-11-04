import { Locator, Page } from '@playwright/test';

export class LeftSideMenuPage {
  page: Page;
  hamburgerMenu: Locator;
  logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');
  }
}
