import { test, expect } from '@playwright/test';

test.describe('UI Tests for Sauce Demo', () => {
  
  // Test Case 1: Verify User Login
  test('Verify User Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');
  });

  // Test Case 2: Verify Adding Item to Cart
  test('Verify Adding Item to Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.textContent('.shopping_cart_badge');
    expect(cartBadge).toBe('1');

    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);

    const cartItemName = await page.textContent('.inventory_item_name');
    expect(cartItemName).toBe('Sauce Labs Backpack');
  });

  // Test Case 3: Verify Adding Multiple Items to Cart
  test('Verify Adding Multiple Items to Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadgeAfterFirstItem = await page.textContent('.shopping_cart_badge');
    expect(cartBadgeAfterFirstItem).toBe('1');

    await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
    const cartBadgeAfterSecondItem = await page.textContent('.shopping_cart_badge');
    expect(cartBadgeAfterSecondItem).toBe('2');

    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');
  });

  // Test Case 4: Verify Removing Item from Cart
  test('Verify Removing Item from Cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.textContent('.shopping_cart_badge');
    expect(cartBadge).toBe('1');

    await page.click('.shopping_cart_link');

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);

    const cartItemName = await page.textContent('.inventory_item_name');
    expect(cartItemName).toBe('Sauce Labs Backpack');

    await page.click('button[data-test="remove-sauce-labs-backpack"]');

    const cartItemsAfterRemove = page.locator('.cart_item');
    await expect(cartItemsAfterRemove).toHaveCount(0);

    const cartBadgeVisible = await page.isVisible('.shopping_cart_badge');
    expect(cartBadgeVisible).toBe(false);
  });

  // Test Case 5: Verify Checkout Process
  test('Verify Checkout Process', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.textContent('.shopping_cart_badge');
    expect(cartBadge).toBe('1');

    await page.click('.shopping_cart_link');

    const cartItemName = await page.textContent('.inventory_item_name');
    expect(cartItemName).toBe('Sauce Labs Backpack');

    await page.click('button[data-test="checkout"]');

    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Dou');
    await page.fill('#postal-code', '12345');
    await page.click('input[data-test="continue"]');

    const summaryTotal = await page.textContent('.summary_total_label');
    expect(summaryTotal).toBe('Total: $32.39');

    await page.click('button[data-test="finish"]');

    const completeOrderHeader = await page.textContent('.complete-header');
    expect(completeOrderHeader).toBe('Thank you for your order!');
  });

  // Test Case 6: Verify Checkout Process for Multiple Items
  test('Verify Checkout Process for Multiple Items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadgeAfterFirstItem = await page.textContent('.shopping_cart_badge');
    expect(cartBadgeAfterFirstItem).toBe('1');

    await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
    const cartBadgeAfterSecondItem = await page.textContent('.shopping_cart_badge');
    expect(cartBadgeAfterSecondItem).toBe('2');

    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    const itemNames = await page.locator('.inventory_item_name').allTextContents();
    expect(itemNames).toContain('Sauce Labs Backpack');
    expect(itemNames).toContain('Sauce Labs Bike Light');

    await page.click('button[data-test="checkout"]');

    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Dou');
    await page.fill('#postal-code', '12345');
    await page.click('input[data-test="continue"]');

    const summaryTotal = await page.textContent('.summary_total_label');
    expect(summaryTotal).toBe('Total: $43.18');

    await page.click('button[data-test="finish"]');

    const completeOrderHeader = await page.textContent('.complete-header');
    expect(completeOrderHeader).toBe('Thank you for your order!');
  });

  // Test Case 7: Verify Non-Existing User Is not Able to Login
  test('Verify Non-Existing User Is not Able to Login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user_123');
    await page.fill('#password', 'secret_sauce_123');

    await page.click('#login-button');

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();

    const errorMessageText = await errorMessage.textContent();
    expect(errorMessageText).toBe(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // Test Case 8: Verify User is able to logout
  test('Verify User is able to logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    const appLogoText = await page.textContent('.app_logo');
    expect(appLogoText).toBe('Swag Labs');

    await page.click('#react-burger-menu-btn');

    const burgerMenu = page.locator('.bm-menu-wrap');
    await expect(burgerMenu).toBeVisible();

    await page.click('#logout_sidebar_link');

    const usernameInput = page.locator('#user-name');
    await expect(usernameInput).toBeVisible();

    const passwordInput = page.locator('#password');
    await expect(passwordInput).toBeVisible();

    const loginButton = page.locator('#login-button');
    await expect(loginButton).toBeVisible();
  });

});
