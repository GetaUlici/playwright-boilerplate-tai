import { Locator, Page } from '@playwright/test';

export class NavbarPage {
  page: Page;
  cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.locator('[data-test="shopping-cart-link"]');
  }
}
