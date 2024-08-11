import {
  it,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from '../src/core';

describe('getCoupons', () => {
  it('should return an arrays of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupons) => {
      expect(coupons).toHaveProperty('code');
      expect(typeof coupons.code).toBe('string');
      expect(coupons.code).toBeTruthy();
    });
  });

  it('should return an array with valid coupon discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupons) => {
      expect(coupons).toHaveProperty('discount');
      expect(typeof coupons.discount).toBe('number');
      expect(coupons.discount).toBeGreaterThan(0);
      expect(coupons.discount).toBeLessThan(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should reurn discoundted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle none-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/Invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/Invalid/i);
  });

  it('should handle none-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/Invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALIDE')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given valid input ', () => {
    expect(validateUserInput('homayoun', 18)).toMatch(/success/i);
  });

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(1, 18)).toMatch(/invalid/i);
  });

  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('ho', 18)).toMatch(/invalid/i);
  });

  it('should return an error if username is longer than 255 characters', () => {
    expect(validateUserInput('H'.repeat(256), 18)).toMatch(/invalid/i);
  });

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('homayoun', '18')).toMatch(/invalid/i);
  });

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('homayoun', 17)).toMatch(/invalid/i);
  });

  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('homayoun', 101)).toMatch(/invalid/i);
  });

  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { secenrio: 'price < min', price: -10, result: false },
    { secenrio: 'price = min', price: 0, result: true },
    { secenrio: 'price between min and max', price: 50, result: true },
    { secenrio: 'price = max', price: 100, result: true },
    { secenrio: 'price > max', price: 200, result: false },
  ])('should return $result when $secenrio', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;
  it('should return false if username is too short ', () => {
    expect(isValidUsername('a'.repeat(minLength - 1))).toBeFalsy();
  });
  it('should return false if username is too long ', () => {
    expect(isValidUsername('a'.repeat(maxLength + 1))).toBeFalsy();
  });
  it('should return true if username is at the min or max length', () => {
    expect(isValidUsername('a'.repeat(minLength))).toBeTruthy();
    expect(isValidUsername('a'.repeat(maxLength))).toBeTruthy();
  });
  it('should return true if username is with in the length constraint', () => {
    expect(isValidUsername('a'.repeat(minLength + 1))).toBeTruthy();
    expect(isValidUsername('a'.repeat(maxLength - 1))).toBeTruthy();
  });
  it('should return false for invalid input types ', () => {
    expect(isValidUsername(null)).toBeFalsy();
    expect(isValidUsername(undefined)).toBeFalsy();
    expect(isValidUsername(1)).toBeFalsy();
  });
});

describe('CanDrive', () => {
  it('should return error for invalid country code ', () => {
    expect(canDrive(20, 'FR')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true },
  ])(
    'should return $result for $age , $country',
    ({ age, country, result }) => {
      expect(canDrive(age, country)).toBe(result);
    },
  );
});

describe('fetchData ', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    try {
      const result = await fetchData();
      expect(Array.isArray(result)).toBeTruthy;
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
  });
});

describe('test suite', () => {
  beforeAll(() => {
    console.log('beforeAll called');
  });

  beforeEach(() => {
    console.log('beforeEach called');
  });

  afterEach(() => {
    console.log('afterEach called');
  });

  afterAll(() => {
    console.log('afterAll called');
  });

  it('test case 1', () => {});
  it('test case 2', () => {});
});

describe('Stack', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });
  it('push should add item to the Stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('pop should remove and return the top item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();
    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it('peak should retrn the top item from the stack whitout removing it', () => {
    stack.push(1);
    stack.push(2);

    const peekedItem = stack.peek();

    expect(peekedItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it('isEmpty should return true if stack is empty', () => {
    expect(stack.isEmpty()).toBeTruthy();
  });

  it('isEmpty should return false if stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();
  });

  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);

    stack.clear();
    expect(stack.size()).toBe(0);
  });
});
