import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';

test.describe('UI Tests for Sauce Demo', () => {
  
  test('Verify User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    const logoText = await inventoryPage.getAppLogoText();
    expect(logoText).toBe('Swag Labs');
  });

  test('Verify Adding Item to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    const cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe('1');

    await inventoryPage.navigateToCart();
    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(1);
  });

  test('Verify Checkout Process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.navigateToCart();

    await cartPage.checkout();

    await checkoutPage.fillCheckoutForm('Hanna', 'Marachkina', '220076');
    const total = await checkoutPage.getSummaryTotal();
    expect(total).toBe('Total: $32.39');

    await checkoutPage.finishOrder();
    const completionMessage = await checkoutPage.getCompletionMessage();
    expect(completionMessage).toBe('Thank you for your order!');
  });

  test('Verify Removing Item from Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    const cartBadge = await inventoryPage.getCartBadgeCount();
    expect(cartBadge).toBe('1');

    await inventoryPage.navigateToCart();

    const itemCountBefore = await cartPage.getCartItemsCount();
    expect(itemCountBefore).toBe(1);

    await cartPage.removeItemFromCart('sauce-labs-backpack');

    const itemCountAfter = await cartPage.getCartItemsCount();
    expect(itemCountAfter).toBe(0);
  });

});
