import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");

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
