import { test, expect } from '../../base';
import { faker } from '@faker-js/faker';

const baseUrl = `${process.env.BASE_URL}`;

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const zipCode = faker.location.zipCode();

test.describe('Place order and cart actions test suite', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto(`${baseUrl}`);
    await loginPage.doLogin();
  });

  test('Place order test @smoke', async ({
    page,
    productsPage,
    navbarPage,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addToCartBtn.click();
    await navbarPage.cartBtn.click();
    await cartPage.checkoutBtn.click();
    await checkoutPage.firstNameField.fill(firstName);
    await checkoutPage.lastNameField.fill(lastName);
    await checkoutPage.zipField.fill(zipCode);
    await checkoutPage.continueBtn.click();
    await checkoutPage.finishbtn.click();
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      'Thank you for your order!'
    );
    await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Complete!');
  });

  test('Add product to cart @smoke', async ({ page, productsPage, navbarPage }) => {
    await productsPage.addToCartBtn.click();
    await navbarPage.cartBtn.click();
    await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike LightA red')).toBeVisible();
  });

  test('Remove product from cart @regression', async ({ page, productsPage }) => {
    await productsPage.addToCartBtn.click();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await productsPage.removeBtn.click();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
  });
});
