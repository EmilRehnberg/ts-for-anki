import * as StringHelpers from "../src/StringHelpers";

describe("string helpers", () => {
  it("dot <int> times", async () => {
    expect(StringHelpers.nDots(2)).toBe("・・");
  });

  it("reads initial digits of a string", async () => {
    expect(StringHelpers.readInitialDigits("3sentence1")).toBe(3);
    expect(StringHelpers.readInitialDigits("32sentence")).toBe(32);
    expect(StringHelpers.readInitialDigits("sentence")).toBe(NaN);
  });

  it("remove initial number in a string", async () => {
    expect(StringHelpers.rmInitialDigits("3sentence1")).toBe("sentence1");
    expect(StringHelpers.rmInitialDigits("32sentence")).toBe("sentence");
    expect(StringHelpers.rmInitialDigits("sentence")).toBe("sentence");
  });

  it("remove numbers in a string", async () => {
    expect(StringHelpers.rmDigits("3sentence1")).toBe("sentence");
    expect(StringHelpers.rmDigits("32sentence")).toBe("sentence");
    expect(StringHelpers.rmDigits("sent3ence")).toBe("sentence");
    expect(StringHelpers.rmDigits("sentence")).toBe("sentence");
  });
});
