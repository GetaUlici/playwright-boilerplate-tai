import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  page: Page;
  addToCartBtn: Locator;
  removeBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.removeBtn = page.locator('[data-test="remove-sauce-labs-bike-light"]');
  }
}
