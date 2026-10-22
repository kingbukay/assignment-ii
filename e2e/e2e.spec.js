
import { test, expect } from '@playwright/test';
import registeredUser from '../utils/registeredUser.json' with { type: 'json' };
import { Registration } from '../pages/Registration.js';
import { Products } from '../pages/Products.js';
import { Checkout } from '../pages/Checkout.js';

test.use({ storageState: { cookies: [], origins: [] } });

test('should complete the full shopping journey @e2e', async ({ page }) => {
  const registration = new Registration(page);
  const products = new Products(page);
  const checkout = new Checkout(page);

  await registration.navigate();

  await registration.login(
    registeredUser.email,
    registeredUser.password
  );

  await expect(registration.accountLink).toHaveText(registeredUser.email);
  await expect(registration.logoutLink).toBeVisible();

  await products.clearShoppingCart();
  await products.openBooks();
  await products.addProductToCart('Computing and Internet');
  await products.openShoppingCart();

  await expect(products.cartProductName).toContainText(
    'Computing and Internet'
  );

  await products.checkout();

  await checkout.fillBillingAddress();
  await checkout.continueBilling();
  await checkout.continueShipping();
  await checkout.continueShippingMethod();
  await checkout.selectPaymentMethod();
  await checkout.continuePaymentMethod();
  await checkout.continuePaymentInfo();
  await checkout.confirmOrder();

  await expect(checkout.orderConfirmation).toBeVisible();
  await expect(checkout.orderConfirmation).toContainText(
    'Your order has been successfully processed!'
  );

  await registration.logoutLink.click();
  await expect(registration.loginLink).toBeVisible();
});
