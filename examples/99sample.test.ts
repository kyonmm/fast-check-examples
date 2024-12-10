import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('Fast-check with Vitest', () => {
  it('should verify properties using fast-check', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        expect(a + b).toEqual(b + a)
      }),
      {verbose: 2}
    );
  });
});
