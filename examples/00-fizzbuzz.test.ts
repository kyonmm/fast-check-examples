import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

const fizzbuzz = (n:number): string => {
  if(n % 3 === 0){
    return "Fizz"
  }
  return n.toString()
};

describe('PBT with TDD', () => {
  it('数字がそのままかえってくる', () => {
    expect(fizzbuzz(1)).toEqual("1");
  });
});
