import { test as baseTest } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { LeftSideMenuPage } from './pages/left-side-menu-page';
import { ProductsPage } from './pages/products-page';
import { NavbarPage } from './pages/navbar-page';
import { CartPage } from './pages/cart-page';
import { CheckoutPage } from './pages/checkout-page';

type MyFixtures = {
  loginPage: LoginPage;
  leftSideMenuPage: LeftSideMenuPage;
  productsPage: ProductsPage;
  navbarPage: NavbarPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  leftSideMenuPage: async ({ page }, use) => {
    await use(new LeftSideMenuPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  navbarPage: async ({ page }, use) => {
    await use(new NavbarPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';
