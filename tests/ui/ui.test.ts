import { test, expect } from '@playwright/test';
import { sum } from '../../src/calculator'; 

test('UI test - should display correct sum', async () => {

  const inputA = 5;
  const inputB = 3;

  const result = sum(inputA, inputB);

  expect(result).toBe(8);
});
