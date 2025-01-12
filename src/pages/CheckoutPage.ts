export class CheckoutPage {
    private readonly page;
  
    constructor(page) {
      this.page = page;
    }
  
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
      await this.page.fill('#first-name', firstName);
      await this.page.fill('#last-name', lastName);
      await this.page.fill('#postal-code', postalCode);
      await this.page.click('input[data-test="continue"]');
    }
  
    async getSummaryTotal(): Promise<string> {
      return await this.page.textContent('.summary_total_label');
    }
  
    async finishOrder() {
      await this.page.click('button[data-test="finish"]');
    }
  
    async getCompletionMessage(): Promise<string> {
      return await this.page.textContent('.complete-header');
    }
  }
  