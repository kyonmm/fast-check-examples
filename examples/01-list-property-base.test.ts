import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

interface Order {
  status: 'completed' | 'pending' | 'cancelled';
  amount: number;
}

const filterAndSumCompletedOrders = (orders: Order[]): number => {
  return orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);
};

describe('Property-based test for order filtering and summing', () => {
  const orderArb = fc.array(
    fc.record({
      status: fc.constantFrom<'completed' | 'pending' | 'cancelled'>('completed', 'pending', 'cancelled'), // 状態
      amount: fc.integer({ min: 0, max: 1000 }) // 金額
    }),
    {size : 'medium'}
  );

  it('should filter completed orders and sum their amounts', () => {
    // completedのみの場合
    fc.assert(
      fc.property(orderArb, (orders) => {
        const completedOrders = orders.filter(order => order.status === 'completed');
        const totalAmount = filterAndSumCompletedOrders(orders);

        const expectedSum = completedOrders.reduce((sum, order) => sum + order.amount, 0);

        expect(totalAmount).toBe(0); // 合計金額が正しいかを検証
      })
      { seed: 696498596, path: "0:1:0:0:0:1:2:2:2:2:2:2:2:2:2:2:3", endOnFailure: true }
    );
    // completed以外のみの場合
    fc.assert(
      fc.property(orderArb, (orders) => {
        const notCompletedOrders = orders.filter(order => order.status != 'completed');
        const totalAmount = filterAndSumCompletedOrders(notCompletedOrders);

        expect(totalAmount).toBe(0); // 合計金額が正しいかを検証
      })
    );
    // 組み合わせの場合
    fc.assert(
      fc.property(orderArb, (orders) => {
        const totalAmount = filterAndSumCompletedOrders(orders);
        const maxTotal = orders.reduce((sum, order) => sum + order.amount, 0);
        expect(totalAmount).toBeGreaterThanOrEqual(0);
        expect(totalAmount).toBeLessThanOrEqual(maxTotal);
      }),
    );
  });
});
