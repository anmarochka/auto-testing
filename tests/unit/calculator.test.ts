import { describe, it, expect } from 'vitest';
import { sum } from '../../src/calculator';

describe('Calculator - Unit Test', () => {
  it('should add two numbers correctly', () => {
    expect(sum(3, 5)).toBe(8);
  });
});
