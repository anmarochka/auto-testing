export class LoginPage {
    private readonly page;
  
    constructor(page) {
      this.page = page;
    }
  
    async navigate() {
      await this.page.goto('https://www.saucedemo.com/');
    }
  
    async login(username: string, password: string) {
      await this.page.fill('#user-name', username);
      await this.page.fill('#password', password);
      await this.page.click('#login-button');
    }
  
    async getErrorMessage(): Promise<string> {
      return this.page.locator('[data-test="error"]').textContent();
    }
  }
  