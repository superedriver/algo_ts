import {
  binarySearch,
  binarySearchFirstEntryInsertionPosition,
  binarySearchLastEntry,
  divideBinaryAccuracy
} from "../../src/search/binary";

describe("Binary", () => {
  describe("Search", () => {
    test("Contains value", () => {
      expect(binarySearch([0, 1, 2, 3, 4, 5], 0)).toBe(0);
      expect(binarySearch([0, 1, 2, 3, 4, 5], 1)).toBe(1);
      expect(binarySearch([0, 1, 2, 3, 4, 5], 2)).toBe(2);
      expect(binarySearch([0, 1, 2, 3, 4, 5], 3)).toBe(3);
      expect(binarySearch([0, 1, 2, 3, 4, 5], 4)).toBe(4);
      expect(binarySearch([0, 1, 2, 3, 4, 5], 5)).toBe(5);
    });

    test("Returns first from the same values", () => {
      expect(binarySearch([0, 1, 1, 1, 1, 2], 1)).toBe(1);
      expect(binarySearch([0, 0, 0, 0, 0, 0], 0)).toBe(0);
    });

    test("Does Not Contain value returns -1", () => {
      expect(binarySearch([0, 1, 2, 3, 4, 5], 8)).toBe(-1);
    });

    test("Empty Array", () => {
      expect(binarySearch([], 8)).toBe(-1);
    });
  });

  describe("Binary First Entry Insertion Position", () => {
    test("Contains value", () => {
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 0)
      ).toBe(0);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 1)
      ).toBe(1);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 2)
      ).toBe(2);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 3)
      ).toBe(3);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 4)
      ).toBe(4);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 5)
      ).toBe(5);
    });

    test("Returns first from the same values", () => {
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 1, 1, 1, 2], 1)
      ).toBe(1);
      expect(
        binarySearchFirstEntryInsertionPosition([0, 0, 0, 0, 0, 0], 0)
      ).toBe(0);
    });

    test("Does Not Contain value returns insert position", () => {
      expect(
        binarySearchFirstEntryInsertionPosition([0, 1, 2, 3, 4, 5], 8)
      ).toBe(6);
    });

    test("Empty Array returns insert position", () => {
      expect(binarySearchFirstEntryInsertionPosition([], 8)).toBe(0);
    });
  });

  describe("Binary Last Entry", () => {
    test("Contains value", () => {
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 0)).toBe(0);
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 1)).toBe(1);
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 2)).toBe(2);
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 3)).toBe(3);
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 4)).toBe(4);
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 5)).toBe(5);
    });

    test("Returns last from the same values", () => {
      expect(binarySearchLastEntry([0, 1, 1, 1, 1, 2], 1)).toBe(4);
      expect(binarySearchLastEntry([0, 0, 0, 0, 0, 0], 0)).toBe(5);
    });

    test("Does Not Contain value returns -1", () => {
      expect(binarySearchLastEntry([0, 1, 2, 3, 4, 5], 8)).toBe(-1);
    });

    test("Empty Array returns -1", () => {
      expect(binarySearchLastEntry([], 8)).toBe(-1);
    });
  });

  describe("With accuracy", () => {
    test("default accuracy", () => {
      expect(divideBinaryAccuracy(100, 10)).toBe(10);
      expect(divideBinaryAccuracy(6, 4)).toBe(1.5);
      expect(divideBinaryAccuracy(100, 3)).toBe(33.333);
    });
  });
});
