import { selectionSort } from "./selection";

describe("selectionSort", () => {
  describe("Basic functionality", () => {
    test("should sort an unsorted array", () => {
      expect(selectionSort([2, 6, 3, 1, 0])).toEqual([0, 1, 2, 3, 6]);
    });

    test("should sort an array with negative numbers", () => {
      expect(selectionSort([-3, -1, -4, -2, 0])).toEqual([-4, -3, -2, -1, 0]);
    });

    test("should sort an array with mixed positive and negative numbers", () => {
      expect(selectionSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("should sort an array with duplicate numbers", () => {
      expect(selectionSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    });

    test("should sort an array with all same elements", () => {
      expect(selectionSort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });
  });

  describe("Edge cases", () => {
    test("should handle an empty array", () => {
      expect(selectionSort([])).toEqual([]);
    });

    test("should handle an array with single element", () => {
      expect(selectionSort([42])).toEqual([42]);
    });

    test("should handle an array with two elements", () => {
      expect(selectionSort([2, 1])).toEqual([1, 2]);
    });

    test("should handle an already sorted array", () => {
      expect(selectionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle an array sorted in descending order", () => {
      expect(selectionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Large arrays", () => {
    test("should sort a large array of random numbers", () => {
      const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const sortedArray = [...largeArray].sort((a, b) => a - b);
      expect(selectionSort(largeArray)).toEqual(sortedArray);
    });

    test("should sort an array with many duplicates", () => {
      expect(selectionSort([3, 1, 3, 2, 1, 3, 2, 1, 3])).toEqual([1, 1, 1, 2, 2, 3, 3, 3, 3]);
    });
  });

  describe("Specific number patterns", () => {
    test("should sort decimal numbers", () => {
      expect(selectionSort([3.1, 1.5, 2.9, 1.1])).toEqual([1.1, 1.5, 2.9, 3.1]);
    });

    test("should sort an array with zeros", () => {
      expect(selectionSort([0, 0, 1, 0])).toEqual([0, 0, 0, 1]);
    });

    test("should sort an array with large numbers", () => {
      expect(selectionSort([1000000, 999999, 1000001])).toEqual([999999, 1000000, 1000001]);
    });

    test("should sort an array with very small numbers", () => {
      expect(selectionSort([0.001, 0.0001, 0.01, 0.1])).toEqual([0.0001, 0.001, 0.01, 0.1]);
    });
  });

  describe("Selection sort specific behavior", () => {
    test("should find minimum element correctly", () => {
      expect(selectionSort([5, 2, 8, 1, 9])).toEqual([1, 2, 5, 8, 9]);
    });

    test("should handle array where minimum is at the end", () => {
      expect(selectionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where minimum is at the beginning", () => {
      expect(selectionSort([1, 5, 4, 3, 2])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with alternating pattern", () => {
      expect(selectionSort([1, 3, 2, 4, 2, 5])).toEqual([1, 2, 2, 3, 4, 5]);
    });
  });

  describe("Stability and consistency", () => {
    test("should produce consistent results for same input", () => {
      const input = [3, 1, 4, 1, 5];
      const result1 = selectionSort(input);
      const result2 = selectionSort(input);
      expect(result1).toEqual(result2);
    });

    test("should handle array with all negative numbers", () => {
      expect(selectionSort([-5, -2, -8, -1, -9])).toEqual([-9, -8, -5, -2, -1]);
    });

    test("should handle array with mixed integer and decimal", () => {
      expect(selectionSort([3, 1.5, 2, 0.5, 4])).toEqual([0.5, 1.5, 2, 3, 4]);
    });
  });
});
