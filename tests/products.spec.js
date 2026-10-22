
import { test, expect } from '@playwright/test';
import { Products } from '../pages/Products.js';

test('should open the Books category @products', async ({ page }) => {
  const products = new Products(page);

  await page.goto('/');
  await products.openBooks();

  await expect(page).toHaveURL(/\/books/);
  await expect(products.productItems.first()).toBeVisible();
});

test('should add a book to the shopping cart @cart', async ({ page }) => {
  const products = new Products(page);

  await page.goto('/');
  await products.openBooks();
  await products.addProductToCart('Computing and Internet');

  await expect(products.shoppingCartLink).toContainText(/\(\d+\)/);
});

test('should verify the added book in the shopping cart @cart', async ({ page }) => {
  const products = new Products(page);

  await page.goto('/');
  await products.openBooks();
  await products.addProductToCart('Computing and Internet');
  await products.openShoppingCart();

  await expect(page).toHaveURL(/\/cart/);
  await expect(products.cartProductName).toContainText(
    'Computing and Internet'
  );
});
