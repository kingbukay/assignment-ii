
import { expect } from '@playwright/test';

export class Checkout {
  constructor(page) {
    this.page = page;

    this.country = page.locator('#BillingNewAddress_CountryId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address = page.locator('#BillingNewAddress_Address1');
    this.zipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = page.locator('#BillingNewAddress_PhoneNumber');

    this.billingAddressSelect = page.locator('#billing-address-select');

    this.billingAddressContinue = page.locator(
      'input[onclick*="Billing.save"]:visible'
    );

    this.shippingAddressContinue = page.locator(
      'input[onclick*="Shipping.save"]:visible'
    );

    this.shippingMethodContinue = page.locator(
      'input[onclick*="ShippingMethod.save"]:visible'
    );

    this.paymentMethod = page.locator('input[name="paymentmethod"]');

    this.paymentMethodContinue = page.locator(
      'input[onclick*="PaymentMethod.save"]:visible'
    );

    this.paymentInfoContinue = page.locator(
      'input[onclick*="PaymentInfo.save"]:visible'
    );

    this.confirmOrderButton = page.locator(
      'input[onclick*="ConfirmOrder.save"]:visible'
    );

    this.validationErrors = page.locator(
      '.field-validation-error, .validation-summary-errors'
    );

    this.orderConfirmation = page.locator('.section.order-completed');
  }

  async fillBillingAddress() {
    await expect(async () => {
      const addressSelectVisible =
        await this.billingAddressSelect.isVisible();
      const countryVisible = await this.country.isVisible();

      expect(addressSelectVisible || countryVisible).toBeTruthy();
    }).toPass();

    if (await this.billingAddressSelect.isVisible()) {
      const selectedAddress = await this.billingAddressSelect
        .locator('option:checked')
        .textContent();

      if (selectedAddress?.trim() !== 'New Address') {
        return;
      }
    }

    await expect(this.country).toBeVisible();
    await this.country.selectOption({ label: 'Nigeria' });
    await this.city.fill('Lagos');
    await this.address.fill('1 Test Street');
    await this.zipCode.fill('100001');
    await this.phone.fill('08012345678');
  }

  async continueBilling() {
    await this.billingAddressContinue.click();

    await expect(async () => {
      const shippingVisible =
        await this.shippingAddressContinue.isVisible();

      const errorsCount = await this.validationErrors.count();

      expect(shippingVisible || errorsCount > 0).toBeTruthy();
    }).toPass();
  }

  async continueShipping() {
    await expect(this.shippingAddressContinue).toBeVisible();
    await this.shippingAddressContinue.click();
    await expect(this.shippingMethodContinue).toBeVisible();
  }

  async continueShippingMethod() {
    await this.shippingMethodContinue.click();
    await expect(this.paymentMethodContinue).toBeVisible();
  }

  async selectPaymentMethod() {
    await this.paymentMethod.first().check();
  }

  async continuePaymentMethod() {
    await this.paymentMethodContinue.click();
    await expect(this.paymentInfoContinue).toBeVisible();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinue.click();
    await expect(this.confirmOrderButton).toBeVisible();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
