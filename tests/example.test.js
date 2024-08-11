import { describe, expect, it } from 'vitest';

describe('test suit', () => {
  it('should return error message', () => {
    const result = 'The request file was not found!';
    // Loose (too general)
    expect(result).toBeDefined();

    // Tight (too spcific)
    expect(result).toBe('The request file was not found!');

    //Better assertation
    expect(result).toMatch(/not found/i);
  });

  it('should return array of numbers', () => {
    const result = [1, 2, 3];

    // Loose (too general)
    expect(result).toBeDefined();

    // Tight (too spcific)
    expect(result).toEqual([1, 2, 3]);

    //Better assertation each depends on functionlity of function
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return the right name', () => {
    const result = { name: 'Homayoun' };

    // Tight (too spcific)
    expect(result).toEqual({ name: 'Homayoun' });

    //Better assertation each depends on functionlity of object in our application
    expect(result).toMatchObject({ name: 'Homayoun' });
    expect(result).toHaveProperty('name');
    expect(typeof result.name).toBe('string');
  });
});
