import { linearSearch, sentinelLinearSearch } from "../../src/search/linear";

describe("Linear", () => {
  describe("Search", () => {
    test("Contains value", () => {
      expect(linearSearch([0, 1, 2, 3, 4, 5], 0)).toBe(0);
      expect(linearSearch([0, 1, 2, 3, 4, 5], 1)).toBe(1);
      expect(linearSearch([0, 1, 2, 3, 4, 5], 2)).toBe(2);
      expect(linearSearch([0, 1, 2, 3, 4, 5], 3)).toBe(3);
      expect(linearSearch([0, 1, 2, 3, 4, 5], 4)).toBe(4);
      expect(linearSearch([0, 1, 2, 3, 4, 5], 5)).toBe(5);
    });

    test("Returns first from the same values", () => {
      expect(linearSearch([0, 1, 1, 1, 1, 2], 1)).toBe(1);
      expect(linearSearch([0, 0, 0, 0, 0, 0], 0)).toBe(0);
    });

    test("Does Not Contain value", () => {
      expect(linearSearch([0, 1, 2, 3, 4, 5], 8)).toBe(-1);
    });

    test("Empty Array returns -1", () => {
      expect(linearSearch([], 8)).toBe(-1);
    });
  });

  describe("Sentinel", () => {
    test("Contains value", () => {
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 0)).toBe(0);
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 1)).toBe(1);
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 2)).toBe(2);
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 3)).toBe(3);
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 4)).toBe(4);
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 5)).toBe(5);
    });

    test("Does Not Contain value", () => {
      expect(sentinelLinearSearch([0, 1, 2, 3, 4, 5], 8)).toBe(-1);
    });

    test("Empty Array", () => {
      expect(sentinelLinearSearch([], 8)).toBe(-1);
    });
  });
});
