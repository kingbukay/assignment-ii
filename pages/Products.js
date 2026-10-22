
import { expect } from '@playwright/test';

export class Products {
  constructor(page) {
    this.page = page;
    this.booksCategory = page.locator('.top-menu a[href="/books"]');
    this.productItems = page.locator('.product-item');
    this.shoppingCartLink = page.locator('.header-links a.ico-cart');
    this.cartProductName = page.locator('.cart .product-name');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async openBooks() {
    await this.booksCategory.click();
  }

  async addProductToCart(productName) {
    const product = this.productItems.filter({
      hasText: productName
    });

    const cartText = await this.shoppingCartLink.innerText();
    const currentCount = Number(
      cartText.match(/\((\d+)\)/)?.[1] ?? 0
    );

    await product.locator('input[value="Add to cart"]').click();

    await expect.poll(async () => {
      const updatedText = await this.shoppingCartLink.innerText();
      return Number(updatedText.match(/\((\d+)\)/)?.[1] ?? 0);
    }).toBeGreaterThan(currentCount);
  }

  async openShoppingCart() {
    await this.shoppingCartLink.click();
    await this.page.waitForURL(/\/cart/);
  }

  async clearShoppingCart() {
    await this.openShoppingCart();

    const removeItems = this.page.locator(
      '.cart-item-row input[name="removefromcart"]'
    );

    while (await removeItems.count() > 0) {
      await removeItems.first().check();

      await this.page
        .getByRole('button', { name: 'Update shopping cart' })
        .click();

      await expect(removeItems.first()).toHaveCount(0);
    }
  }

  async checkout() {
    await this.termsCheckbox.check();
    await expect(this.checkoutButton).toBeEnabled();
    await this.checkoutButton.click();
  }
}
