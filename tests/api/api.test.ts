import { test, expect } from '@playwright/test';
import { sum } from '../../src/calculator';

test('API simulation should correctly add two numbers', async () => {
  const a = 5;
  const b = 3;
  const result = sum(a, b);
  expect(result).toBe(8);
});
