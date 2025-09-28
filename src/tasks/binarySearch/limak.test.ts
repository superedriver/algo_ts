import { findMaxTaskAmount } from "./limak";

describe("findMaxTaskAmount", () => {
    test("should calculate maxTaskAmount", () => {
      expect(findMaxTaskAmount(3, 222)).toBe(2);
      expect(findMaxTaskAmount(4, 190)).toBe(4);
      expect(findMaxTaskAmount(7, 1)).toBe(7);
    });
});
