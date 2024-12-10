import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

const calculateMonthlyPayment = (principal: number, rate: number, years: number): number => {
  const monthlyRate = rate / 12;
  const numberOfPayments = years * 12;
  
  if (rate <= 0 || (Math.abs(rate) < 1e-10)) {
    return principal / numberOfPayments;
  }
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
};

describe('Property-based test for loan payment calculation', () => {
  const loanArb = fc.record({
    principal: fc.integer({ min: 1000, max: 1000000 }), // 元本
    rate: fc.double({ min: 0, max: 0.2, noNaN: true, noDefaultInfinity: true  }), // 金利（0% ~ 20%）
    years: fc.integer({ min: 1, max: 30 }) // 返済期間（1年 ~ 30年）
  });

  it('should calculate correct monthly payment for any loan', () => {
    fc.assert(
      fc.property(loanArb, ({ principal, rate, years }) => {
        const payment = calculateMonthlyPayment(principal, rate, years);
        expect(payment).toBeGreaterThan(0); // 月額返済が0より大きいことを確認
      })
    );
  });
});
