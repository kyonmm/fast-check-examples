import { describe, it, expect } from 'vitest';

const calculateMonthlyPayment = (principal: number, rate: number, years: number): number => {
  const monthlyRate = rate / 12;
  const numberOfPayments = years * 12;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
};

describe('Example-based test for loan payment calculation', () => {
  it('should calculate correct monthly payment for fixed case', () => {
    const payment = calculateMonthlyPayment(100000, 0.05, 30);
    expect(payment).toBeCloseTo(536.82, 2); // 固定されたケースのテスト
  });
});
