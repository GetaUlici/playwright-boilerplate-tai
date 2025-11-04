import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  page: Page;
  firstNameField: Locator;
  lastNameField: Locator;
  zipField: Locator;
  continueBtn: Locator;
  finishbtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.zipField = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishbtn = page.locator('[data-test="finish"]');
  }
}
