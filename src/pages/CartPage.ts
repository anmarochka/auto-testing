export class CartPage {
    private readonly page;
  
    constructor(page) {
      this.page = page;
    }
  
    async getCartItemsCount(): Promise<number> {
      return await this.page.locator('.cart_item').count();
    }
  
    async getCartItemNames(): Promise<string[]> {
      return await this.page.locator('.inventory_item_name').allTextContents();
    }
  
    async removeItemFromCart(itemId: string) {
      await this.page.click(`button[data-test="remove-${itemId}"]`);
    }
  
    async checkout() {
      await this.page.click('button[data-test="checkout"]');
    }
  }
  