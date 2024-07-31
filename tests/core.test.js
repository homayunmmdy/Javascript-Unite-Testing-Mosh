import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons, validateUserInput } from "../src/core";

describe("getCoupons", () => {
  it("should return an arrays of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupons) => {
      expect(coupons).toHaveProperty("code");
      expect(typeof coupons.code).toBe("string");
      expect(coupons.code).toBeTruthy();
    });
  });

  it("should return an array with valid coupon discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupons) => {
      expect(coupons).toHaveProperty("discount");
      expect(typeof coupons.discount).toBe("number");
      expect(coupons.discount).toBeGreaterThan(0);
      expect(coupons.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should reurn discoundted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle none-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/Invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/Invalid/i);
  });

  it("should handle none-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/Invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALIDE")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return success if given valid input ", () => {
    expect(validateUserInput("homayoun", 18)).toMatch(/success/i);
  });

  it("should return an error if username is not a string", () => {
    expect(validateUserInput(1, 18)).toMatch(/invalid/i);
  });

  it("should return an error if username is less than 3 characters", () => {
    expect(validateUserInput('ho', 18)).toMatch(/invalid/i);
  });

  it("should return an error if username is longer than 255 characters", () => {
    expect(validateUserInput('H'.repeat(256), 18)).toMatch(/invalid/i);
  });

  it("should return an error if age is not a number", () => {
    expect(validateUserInput("homayoun", "18")).toMatch(/invalid/i);
  });

  it("should return an error if age is less than 18", () => {
    expect(validateUserInput("homayoun", 17)).toMatch(/invalid/i);
  });

  it("should return an error if age is greater than 100", () => {
    expect(validateUserInput("homayoun", 101)).toMatch(/invalid/i);
  });

  it("should return an error if both username and age are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username/i);
    expect(validateUserInput("", 0)).toMatch(/invalid age/i);
  });
});
