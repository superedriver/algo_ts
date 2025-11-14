import { bubbleSort } from "./bubble";

describe("bubbleSort", () => {
  describe("Basic functionality", () => {
    test("should sort an unsorted array", () => {
      expect(bubbleSort([2, 6, 3, 1, 0])).toEqual([0, 1, 2, 3, 6]);
    });

    test("should sort an array with negative numbers", () => {
      expect(bubbleSort([-3, -1, -4, -2, 0])).toEqual([-4, -3, -2, -1, 0]);
    });

    test("should sort an array with mixed positive and negative numbers", () => {
      expect(bubbleSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("should sort an array with duplicate numbers", () => {
      expect(bubbleSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    });
  });

  describe("Edge cases", () => {
    test("should handle an empty array", () => {
      expect(bubbleSort([])).toEqual([]);
    });

    test("should handle an array with single element", () => {
      expect(bubbleSort([5])).toEqual([5]);
    });

    test("should handle an array with two elements", () => {
      expect(bubbleSort([2, 1])).toEqual([1, 2]);
    });

    test("should handle an already sorted array", () => {
      expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle an array sorted in descending order", () => {
      expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Large arrays", () => {
    test("should sort a large array of random numbers", () => {
      const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const sortedArray = [...largeArray].sort((a, b) => a - b);
      expect(bubbleSort(largeArray)).toEqual(sortedArray);
    });

    test("should sort an array with all same elements", () => {
      expect(bubbleSort([3, 3, 3, 3, 3])).toEqual([3, 3, 3, 3, 3]);
    });
  });

  describe("Specific number patterns", () => {
    test("should sort decimal numbers", () => {
      expect(bubbleSort([3.1, 1.5, 2.9, 1.1])).toEqual([1.1, 1.5, 2.9, 3.1]);
    });

    test("should sort an array with zeros", () => {
      expect(bubbleSort([0, 0, 1, 0])).toEqual([0, 0, 0, 1]);
    });

    test("should sort an array with large numbers", () => {
      expect(bubbleSort([1000000, 999999, 1000001])).toEqual([999999, 1000000, 1000001]);
    });
  });
});
