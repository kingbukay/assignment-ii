import { test, expect } from '@playwright/test';
import { Registration } from '../pages/Registration.js';

test('should log out the registered user @logout', async ({ page }) => {
  const registration = new Registration(page);

  await registration.navigate();

  await expect(registration.logoutLink).toBeVisible();

  await registration.logoutLink.click();

  await expect(registration.loginLink).toBeVisible();
  await expect(registration.logoutLink).not.toBeVisible();
});