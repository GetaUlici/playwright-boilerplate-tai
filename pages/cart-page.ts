import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }
}
