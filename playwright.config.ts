import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, 
  reporter: [['list'], ['html']], 
  projects: [
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
    {
      name: 'UI Tests',
      testDir: './tests/ui',
      use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false, 
        browserName: 'chromium', 
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
    },
  ],
  use: {
    launchOptions: {
      slowMo: 3000, 
    },
  },
});
