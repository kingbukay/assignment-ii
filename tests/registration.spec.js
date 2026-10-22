import { test, expect } from '@playwright/test';
import registeredUser from '../utils/registeredUser.json' with { type: 'json' };
import { Registration } from '../pages/Registration.js';

test('should verify the registered user is logged in @registration', async ({ page }) => {
  const registration = new Registration(page);

  await registration.navigate();

  await expect(registration.accountLink).toBeVisible();
  await expect(registration.accountLink).toHaveText(registeredUser.email);
  await expect(registration.logoutLink).toBeVisible();

  await registration.openAccount();

  await expect(page).toHaveURL(/\/customer\/info/);
});