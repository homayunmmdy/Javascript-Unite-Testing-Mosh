import { it, expect, describe } from 'vitest'
import { calculateDiscount } from '../src/main';

describe('calculateDiscount', () => {
    it('should reurn discoundted price if given valid code', () => {
      expect(calculateDiscount(10, 'SAVE10')).toBe(9);
      expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });
  
    it('should handle negative price', () => {
      expect(calculateDiscount(-10, 'SAVE10')).toMatch(/Invalid/i);
    });
  
    it('should handle invalid discount code', () => {
      expect(calculateDiscount(10, 'INVALIDE')).toBe(10);
    });
  });