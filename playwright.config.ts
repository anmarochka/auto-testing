import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api', 
  timeout: 30000,
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
});
