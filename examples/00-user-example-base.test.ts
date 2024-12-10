import { describe, it, expect } from 'vitest';

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

describe('Example-based test for user validation', () => {
  it('should validate a valid user', () => {
    const validUser: User = { name: 'John Doe', age: 25, email: 'john@example.com' };
    expect(validateUser(validUser)).toBe(true);
  });

  it('should fail for invalid email', () => {
    const invalidUser: User = { name: 'John Doe', age: 25, email: 'invalid-email' };
    expect(validateUser(invalidUser)).toBe(false);
  });

  it('should fail for underage user', () => {
    const underageUser: User = { name: 'John Doe', age: 17, email: 'john@example.com' };
    expect(validateUser(underageUser)).toBe(false);
  });
});
