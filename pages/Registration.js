export class Registration {
  constructor(page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.maleRadio = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.confirmationMessage = page.locator('.result');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.accountLink = page.locator('.header-links a.account');
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.loginEmailInput = page.locator('#Email');
    this.loginPasswordInput = page.locator('#Password');
    this.loginButton = page.locator('input[value="Log in"]');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async navigate() {
    await this.page.goto('/');
  }

  async openRegistrationPage() {
    await this.registerLink.click();
  }

  async registerUser(firstName, lastName, email, password) {
    await this.maleRadio.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }

  async openAccount() {
    await this.accountLink.click();
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }
}