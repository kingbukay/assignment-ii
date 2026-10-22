import { chromium, expect } from '@playwright/test';
import { Registration } from '../pages/Registration.js';
import { generateUserData } from '../utils/testData.js';
import fs from 'fs';

async function globalSetup() {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    baseURL: 'https://demowebshop.tricentis.com'
  });

  const page = await context.newPage();

  const registration = new Registration(page);
  const user = generateUserData();

  await registration.navigate();
  await registration.openRegistrationPage();

  await registration.registerUser(
    user.firstName,
    user.lastName,
    user.email,
    user.password
  );

  await expect(registration.confirmationMessage).toContainText(
    'Your registration completed'
  );

  await expect(registration.logoutLink).toBeVisible();

  fs.writeFileSync(
    './utils/registeredUser.json',
    JSON.stringify(user, null, 2)
  );

  await context.storageState({
    path: './utils/demowebshop.json'
  });

  await browser.close();
}

export default globalSetup;