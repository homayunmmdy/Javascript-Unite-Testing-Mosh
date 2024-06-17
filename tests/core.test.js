import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons } from "../src/core";

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
    expect(calculateDiscount(10, "INVALIDE")).toBe(10)
  });
});
