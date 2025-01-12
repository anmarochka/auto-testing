export class InventoryPage {
    private readonly page;
  
    constructor(page) {
      this.page = page;
    }
  
    async getAppLogoText(): Promise<string> {
      return this.page.textContent('.app_logo');
    }
  
    async addItemToCart(itemId: string) {
      await this.page.click(`button[data-test="add-to-cart-${itemId}"]`);
    }
  
    async getCartBadgeCount(): Promise<string> {
      return this.page.textContent('.shopping_cart_badge');
    }
  
    async navigateToCart() {
      await this.page.click('.shopping_cart_link');
    }
  }
  