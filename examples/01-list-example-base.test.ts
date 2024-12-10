import { describe, it, expect } from 'vitest';

interface Order {
  status: 'completed' | 'pending' | 'cancelled';
  amount: number;
}

const filterAndSumCompletedOrders = (orders: Order[]): number => {
  return orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);
};

describe('Example-based test for order filtering and summing', () => {
  it('should sum the amounts of completed orders', () => {
    const orders: Order[] = [
      { status: 'completed', amount: 100 },
      { status: 'pending', amount: 50 },
      { status: 'completed', amount: 200 },
    ];
    expect(filterAndSumCompletedOrders(orders)).toBe(300);
  });

  it('should return 0 when no orders are completed', () => {
    const orders: Order[] = [
      { status: 'pending', amount: 50 },
      { status: 'cancelled', amount: 100 },
    ];
    expect(filterAndSumCompletedOrders(orders)).toBe(0);
  });
});
