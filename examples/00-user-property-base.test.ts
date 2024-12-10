import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

interface User {
    name: string;
    age: number;
    email: string;
  }
  
  const validateUser = (user: User): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      user.name.length > 0 &&
      user.age >= 18 &&
      emailRegex.test(user.email)
    );
  };
  
describe('Property-based test for user validation', () => {
  const userArb = fc.record({
    name: fc.string(),
    age: fc.integer(),
    email: fc.emailAddress(),
  });

  const invalidEmailArb = fc.oneof(
    fc.string().filter(s => !/^[\u3040-\u30FF\uFF66-\uFF9F]+$/.test(s)), // カナの範囲外
    fc.string().filter(s => !s.includes('@')), // 「@」を含まない
    fc.string().filter(s => s.startsWith('@')), // ローカル部分がない
    fc.string().filter(s => s.endsWith('@')), // ドメイン部分がない
    fc.string().filter(s => s.includes(' ')), // 空白が含まれている
  );
  const userInvalidEmailArb = fc.record({
    name: fc.string(),
    age: fc.integer(),
    email: invalidEmailArb,
  });

  it('should validate a valid user object correctly', () => {
    fc.assert(
      fc.property(userArb, (user) => {
        if(user.name.length <= 0){
            expect(validateUser(user)).toBe(true);
        }
        else if(user.age < 18){
            expect(validateUser(user)).toBe(true);
        }
        else{
            expect(validateUser(user)).toBe(true);
        }
      })
    );
    fc.assert(
        fc.property(userInvalidEmailArb, (user) => {
            expect(validateUser(user)).toBe(true);
        })
      );
    });
});
