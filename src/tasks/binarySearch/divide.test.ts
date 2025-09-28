import { divideLinear, divideBinary, divideBinaryAccuracy } from "./divide";

describe("divide", () => {
  test("divideLinear", () => {
    expect(divideLinear(10, 5)).toBe(2);
    expect(divideLinear(10, 3)).toBe(3);
  });

  test("divideBinary", () => {
    expect(divideBinary(10, 5)).toBe(2);
    expect(divideBinary(10, 2)).toBe(5);
  });

  test("divideBinaryAccuracy", () => {
    expect(divideBinaryAccuracy(10, 5)).toBe(2);
    expect(divideBinaryAccuracy(6, 4)).toBe(1.5);
    expect(divideBinaryAccuracy(10, 3)).toBe(3.333740234375);
  });
});
