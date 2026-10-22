import { test, expect } from '@playwright/test';
import registeredUser from '../utils/registeredUser.json' with { type: 'json' };
import { Registration } from '../pages/Registration.js';

test.use({ storageState: { cookies: [], origins: [] } });

test('should verify the registered user can log in @login', async ({ page }) => {
  const registration = new Registration(page);

  await registration.navigate();

  await registration.login(
    registeredUser.email,
    registeredUser.password
  );

  await expect(registration.accountLink).toBeVisible();
  await expect(registration.accountLink).toHaveText(registeredUser.email);
  await expect(registration.logoutLink).toBeVisible();
});
