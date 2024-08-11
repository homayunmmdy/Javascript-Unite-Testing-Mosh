import { vi, it, expect, describe, beforeEach } from "vitest";
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe("test suite", () => {
  it("test case", () => {
    const greet = vi.fn();
    greet.mockImplementation((name) => "Hello" + name);
    greet("Homayoun");
    expect(greet).toHaveBeenCalledOnce("Homayoun");
  });
  it("should send text message", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");
    const result = sendText("message");
    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const result = getShippingInfo("London");
    expect(result).toMatch(/unavailable/i);
  });
  it("should return shipping info if quote can be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 10,
      estimatedDays: 2,
    });
    const result = getShippingInfo("London");
    expect(result).toMatch("$10");
    expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

describe("renderPage", () => {
  it("should return the correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });
  it("should call analytics", async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };
  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });
  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({
      success: true,
    });
  });
  it("should return failed when payment is failed", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({
      success: false,
      error: "payment_error",
    });
  });
});

describe("signUp", () => {
  const email = "name@domain.com";

  it("should return false if email is not valid", async () => {
    const result = await signUp("a");
    expect(result).toBeFalsy();
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBeTruthy();
  });
  it("should send the welcome email if email is valid", async () => {
    const result = await signUp(email);
    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcom/i);
  });
});

describe('isOnline', () => {
  it('should return false if current hour is outside opening hours', () => {
    vi.setSystemTime('2024-01-01 07:59');
    expect(isOnline()).toBeFalsy()
    vi.setSystemTime('2024-01-01 20:01');
    expect(isOnline()).toBeFalsy()
  });

  it('should return true if current hour is within opening hours', () => {
    vi.setSystemTime('2024-01-01 08:00');
    expect(isOnline()).toBeTruthy()
    vi.setSystemTime('2024-01-01 19:59');
    expect(isOnline()).toBeTruthy()
  })
});

describe('getDiscount', () => {
  it('should return .2 on Christmas day', () => {
    vi.setSystemTime('2024-12-25 00:01');
    expect(getDiscount()).toBe(.2)
    vi.setSystemTime('2024-12-25 23:59');
    expect(getDiscount()).toBe(.2)
  })
  it('should return 0 on any other day', () => {
    vi.setSystemTime('2024-12-24 00:01');
    expect(getDiscount()).toBe(0)
    vi.setSystemTime('2024-12-26 00:01');
    expect(getDiscount()).toBe(0)
  })
})