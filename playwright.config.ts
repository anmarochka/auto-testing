import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'api',
      testMatch: /.*api.test.ts/,
    },
    {
      name: 'ui',
      testMatch: /.*ui.test.ts/,
    },
  ],
});
