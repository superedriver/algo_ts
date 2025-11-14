import { insertionSort, binaryInsertionSort, insertionSortOptimised } from "./insertion";

describe("insertionSort", () => {
  describe("Basic functionality", () => {
    test("should sort an unsorted array", () => {
      expect(insertionSort([2, 6, 3, 1, 0])).toEqual([0, 1, 2, 3, 6]);
    });

    test("should sort an array with negative numbers", () => {
      expect(insertionSort([-3, -1, -4, -2, 0])).toEqual([-4, -3, -2, -1, 0]);
    });

    test("should sort an array with mixed positive and negative numbers", () => {
      expect(insertionSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("should sort an array with duplicate numbers", () => {
      expect(insertionSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    });

    test("should sort an array with all same elements", () => {
      expect(insertionSort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });
  });

  describe("Edge cases", () => {
    test("should handle an empty array", () => {
      expect(insertionSort([])).toEqual([]);
    });

    test("should handle an array with single element", () => {
      expect(insertionSort([42])).toEqual([42]);
    });

    test("should handle an array with two elements", () => {
      expect(insertionSort([2, 1])).toEqual([1, 2]);
    });

    test("should handle an already sorted array", () => {
      expect(insertionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle an array sorted in descending order", () => {
      expect(insertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Large arrays", () => {
    test("should sort a large array of random numbers", () => {
      const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const sortedArray = [...largeArray].sort((a, b) => a - b);
      expect(insertionSort(largeArray)).toEqual(sortedArray);
    });

    test("should sort an array with many duplicates", () => {
      expect(insertionSort([3, 1, 3, 2, 1, 3, 2, 1, 3])).toEqual([1, 1, 1, 2, 2, 3, 3, 3, 3]);
    });
  });

  describe("Specific number patterns", () => {
    test("should sort decimal numbers", () => {
      expect(insertionSort([3.1, 1.5, 2.9, 1.1])).toEqual([1.1, 1.5, 2.9, 3.1]);
    });

    test("should sort an array with zeros", () => {
      expect(insertionSort([0, 0, 1, 0])).toEqual([0, 0, 0, 1]);
    });

    test("should sort an array with large numbers", () => {
      expect(insertionSort([1000000, 999999, 1000001])).toEqual([999999, 1000000, 1000001]);
    });

    test("should sort an array with very small numbers", () => {
      expect(insertionSort([0.001, 0.0001, 0.01, 0.1])).toEqual([0.0001, 0.001, 0.01, 0.1]);
    });
  });

  describe("Insertion sort specific behavior", () => {
    test("should efficiently handle nearly sorted arrays", () => {
      expect(insertionSort([1, 2, 3, 5, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far left", () => {
      expect(insertionSort([2, 3, 4, 5, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far right", () => {
      expect(insertionSort([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with alternating large and small values", () => {
      expect(insertionSort([10, 1, 9, 2, 8, 3])).toEqual([1, 2, 3, 8, 9, 10]);
    });

    test("should handle array where each element needs different insertion position", () => {
      expect(insertionSort([6, 5, 3, 1, 8, 7, 2, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });
  });

  describe("Stability and consistency", () => {
    test("should produce consistent results for same input", () => {
      const input = [3, 1, 4, 1, 5];
      const result1 = insertionSort(input);
      const result2 = insertionSort(input);
      expect(result1).toEqual(result2);
    });

    test("should handle array with all negative numbers", () => {
      expect(insertionSort([-5, -2, -8, -1, -9])).toEqual([-9, -8, -5, -2, -1]);
    });

    test("should handle array with mixed integer and decimal", () => {
      expect(insertionSort([3, 1.5, 2, 0.5, 4])).toEqual([0.5, 1.5, 2, 3, 4]);
    });

    test("should maintain relative order of equal elements", () => {
      expect(insertionSort([3, 1, 3, 1])).toEqual([1, 1, 3, 3]);
    });
  });

  describe("Insertion sort efficiency scenarios", () => {
    test("should handle best case scenario (already sorted)", () => {
      expect(insertionSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle worst case scenario (reverse sorted)", () => {
      expect(insertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle partially sorted array", () => {
      expect(insertionSort([1, 2, 3, 7, 4, 5, 6, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
});

describe("binaryInsertionSort", () => {
  describe("Basic functionality", () => {
    test("should sort an unsorted array", () => {
      expect(binaryInsertionSort([2, 6, 3, 1, 0])).toEqual([0, 1, 2, 3, 6]);
    });

    test("should sort an array with negative numbers", () => {
      expect(binaryInsertionSort([-3, -1, -4, -2, 0])).toEqual([-4, -3, -2, -1, 0]);
    });

    test("should sort an array with mixed positive and negative numbers", () => {
      expect(binaryInsertionSort([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("should sort an array with duplicate numbers", () => {
      expect(binaryInsertionSort([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    });

    test("should sort an array with all same elements", () => {
      expect(binaryInsertionSort([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });
  });

  describe("Edge cases", () => {
    test("should handle an empty array", () => {
      expect(binaryInsertionSort([])).toEqual([]);
    });

    test("should handle an array with single element", () => {
      expect(binaryInsertionSort([42])).toEqual([42]);
    });

    test("should handle an array with two elements", () => {
      expect(binaryInsertionSort([2, 1])).toEqual([1, 2]);
    });

    test("should handle an already sorted array", () => {
      expect(binaryInsertionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle an array sorted in descending order", () => {
      expect(binaryInsertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Large arrays", () => {
    test("should sort a large array of random numbers", () => {
      const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const sortedArray = [...largeArray].sort((a, b) => a - b);
      expect(binaryInsertionSort(largeArray)).toEqual(sortedArray);
    });

    test("should sort an array with many duplicates", () => {
      expect(binaryInsertionSort([3, 1, 3, 2, 1, 3, 2, 1, 3])).toEqual([1, 1, 1, 2, 2, 3, 3, 3, 3]);
    });
  });

  describe("Specific number patterns", () => {
    test("should sort decimal numbers", () => {
      expect(binaryInsertionSort([3.1, 1.5, 2.9, 1.1])).toEqual([1.1, 1.5, 2.9, 3.1]);
    });

    test("should sort an array with zeros", () => {
      expect(binaryInsertionSort([0, 0, 1, 0])).toEqual([0, 0, 0, 1]);
    });

    test("should sort an array with large numbers", () => {
      expect(binaryInsertionSort([1000000, 999999, 1000001])).toEqual([999999, 1000000, 1000001]);
    });

    test("should sort an array with very small numbers", () => {
      expect(binaryInsertionSort([0.001, 0.0001, 0.01, 0.1])).toEqual([0.0001, 0.001, 0.01, 0.1]);
    });
  });

  describe("Binary insertion sort specific behavior", () => {
    test("should efficiently find insertion position using binary search", () => {
      expect(binaryInsertionSort([1, 2, 3, 5, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far left", () => {
      expect(binaryInsertionSort([2, 3, 4, 5, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far right", () => {
      expect(binaryInsertionSort([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with alternating large and small values", () => {
      expect(binaryInsertionSort([10, 1, 9, 2, 8, 3])).toEqual([1, 2, 3, 8, 9, 10]);
    });

    test("should handle array where each element needs different insertion position", () => {
      expect(binaryInsertionSort([6, 5, 3, 1, 8, 7, 2, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test("should handle array with elements that need to be inserted at the beginning", () => {
      expect(binaryInsertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with elements that need to be inserted at the end", () => {
      expect(binaryInsertionSort([1, 2, 3, 4, 0])).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("Binary search efficiency scenarios", () => {
    test("should handle best case scenario (already sorted)", () => {
      expect(binaryInsertionSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle worst case scenario (reverse sorted)", () => {
      expect(binaryInsertionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle partially sorted array", () => {
      expect(binaryInsertionSort([1, 2, 3, 7, 4, 5, 6, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle array where binary search finds correct position quickly", () => {
      expect(binaryInsertionSort([1, 3, 5, 7, 9, 2, 4, 6, 8, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe("Stability and consistency", () => {
    test("should produce consistent results for same input", () => {
      const input = [3, 1, 4, 1, 5];
      const result1 = binaryInsertionSort(input);
      const result2 = binaryInsertionSort(input);
      expect(result1).toEqual(result2);
    });

    test("should handle array with all negative numbers", () => {
      expect(binaryInsertionSort([-5, -2, -8, -1, -9])).toEqual([-9, -8, -5, -2, -1]);
    });

    test("should handle array with mixed integer and decimal", () => {
      expect(binaryInsertionSort([3, 1.5, 2, 0.5, 4])).toEqual([0.5, 1.5, 2, 3, 4]);
    });

    test("should maintain relative order of equal elements", () => {
      expect(binaryInsertionSort([3, 1, 3, 1])).toEqual([1, 1, 3, 3]);
    });
  });

  describe("Comparison with regular insertion sort", () => {
    test("should produce same results as regular insertion sort", () => {
      const testArray = [5, 2, 8, 1, 9, 3, 7, 4, 6];
      expect(binaryInsertionSort(testArray)).toEqual(insertionSort(testArray));
    });

    test("should handle edge cases same as regular insertion sort", () => {
      const edgeCases = [
        [],
        [1],
        [2, 1],
        [1, 2, 3],
        [3, 2, 1],
        [1, 1, 1],
        [1, 2, 1, 2]
      ];

      edgeCases.forEach(testCase => {
        expect(binaryInsertionSort(testCase)).toEqual(insertionSort(testCase));
      });
    });
  });
});

describe("insertionSortOptimised", () => {
  describe("Basic functionality", () => {
    test("should sort an unsorted array", () => {
      expect(insertionSortOptimised([2, 6, 3, 1, 0])).toEqual([0, 1, 2, 3, 6]);
    });

    test("should sort an array with negative numbers", () => {
      expect(insertionSortOptimised([-3, -1, -4, -2, 0])).toEqual([-4, -3, -2, -1, 0]);
    });

    test("should sort an array with mixed positive and negative numbers", () => {
      expect(insertionSortOptimised([3, -1, 0, -5, 2])).toEqual([-5, -1, 0, 2, 3]);
    });

    test("should sort an array with duplicate numbers", () => {
      expect(insertionSortOptimised([3, 1, 3, 2, 1])).toEqual([1, 1, 2, 3, 3]);
    });

    test("should sort an array with all same elements", () => {
      expect(insertionSortOptimised([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
    });
  });

  describe("Edge cases", () => {
    test("should handle an empty array", () => {
      expect(insertionSortOptimised([])).toEqual([]);
    });

    test("should handle an array with single element", () => {
      expect(insertionSortOptimised([42])).toEqual([42]);
    });

    test("should handle an array with two elements", () => {
      expect(insertionSortOptimised([2, 1])).toEqual([1, 2]);
    });

    test("should handle an already sorted array", () => {
      expect(insertionSortOptimised([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle an array sorted in descending order", () => {
      expect(insertionSortOptimised([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("Large arrays", () => {
    test("should sort a large array of random numbers", () => {
      const largeArray = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
      const sortedArray = [...largeArray].sort((a, b) => a - b);
      expect(insertionSortOptimised(largeArray)).toEqual(sortedArray);
    });

    test("should sort an array with many duplicates", () => {
      expect(insertionSortOptimised([3, 1, 3, 2, 1, 3, 2, 1, 3])).toEqual([1, 1, 1, 2, 2, 3, 3, 3, 3]);
    });
  });

  describe("Specific number patterns", () => {
    test("should sort decimal numbers", () => {
      expect(insertionSortOptimised([3.1, 1.5, 2.9, 1.1])).toEqual([1.1, 1.5, 2.9, 3.1]);
    });

    test("should sort an array with zeros", () => {
      expect(insertionSortOptimised([0, 0, 1, 0])).toEqual([0, 0, 0, 1]);
    });

    test("should sort an array with large numbers", () => {
      expect(insertionSortOptimised([1000000, 999999, 1000001])).toEqual([999999, 1000000, 1000001]);
    });

    test("should sort an array with very small numbers", () => {
      expect(insertionSortOptimised([0.001, 0.0001, 0.01, 0.1])).toEqual([0.0001, 0.001, 0.01, 0.1]);
    });
  });

  describe("Optimised insertion sort specific behavior", () => {
    test("should efficiently handle nearly sorted arrays", () => {
      expect(insertionSortOptimised([1, 2, 3, 5, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far left", () => {
      expect(insertionSortOptimised([2, 3, 4, 5, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array where elements need to be moved far right", () => {
      expect(insertionSortOptimised([5, 1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with alternating large and small values", () => {
      expect(insertionSortOptimised([10, 1, 9, 2, 8, 3])).toEqual([1, 2, 3, 8, 9, 10]);
    });

    test("should handle array where each element needs different insertion position", () => {
      expect(insertionSortOptimised([6, 5, 3, 1, 8, 7, 2, 4])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    test("should handle array with elements that need to be inserted at the beginning", () => {
      expect(insertionSortOptimised([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle array with elements that need to be inserted at the end", () => {
      expect(insertionSortOptimised([1, 2, 3, 4, 0])).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("Optimisation efficiency scenarios", () => {
    test("should handle best case scenario (already sorted)", () => {
      expect(insertionSortOptimised([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle worst case scenario (reverse sorted)", () => {
      expect(insertionSortOptimised([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle partially sorted array", () => {
      expect(insertionSortOptimised([1, 2, 3, 7, 4, 5, 6, 8, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle array where optimisation reduces swaps", () => {
      expect(insertionSortOptimised([1, 3, 5, 7, 9, 2, 4, 6, 8, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });

  describe("Stability and consistency", () => {
    test("should produce consistent results for same input", () => {
      const input = [3, 1, 4, 1, 5];
      const result1 = insertionSortOptimised(input);
      const result2 = insertionSortOptimised(input);
      expect(result1).toEqual(result2);
    });

    test("should handle array with all negative numbers", () => {
      expect(insertionSortOptimised([-5, -2, -8, -1, -9])).toEqual([-9, -8, -5, -2, -1]);
    });

    test("should handle array with mixed integer and decimal", () => {
      expect(insertionSortOptimised([3, 1.5, 2, 0.5, 4])).toEqual([0.5, 1.5, 2, 3, 4]);
    });

    test("should maintain relative order of equal elements", () => {
      expect(insertionSortOptimised([3, 1, 3, 1])).toEqual([1, 1, 3, 3]);
    });
  });

  describe("Comparison with regular insertion sort", () => {
    test("should produce same results as regular insertion sort", () => {
      const testArray = [5, 2, 8, 1, 9, 3, 7, 4, 6];
      expect(insertionSortOptimised(testArray)).toEqual(insertionSort(testArray));
    });

    test("should handle edge cases same as regular insertion sort", () => {
      const edgeCases = [
        [],
        [1],
        [2, 1],
        [1, 2, 3],
        [3, 2, 1],
        [1, 1, 1],
        [1, 2, 1, 2]
      ];

      edgeCases.forEach(testCase => {
        expect(insertionSortOptimised(testCase)).toEqual(insertionSort(testCase));
      });
    });
  });

  describe("Optimisation benefits", () => {
    test("should handle array with repeated patterns efficiently", () => {
      expect(insertionSortOptimised([1, 1, 2, 2, 3, 3, 4, 4, 5, 5])).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
    });

    test("should handle array with elements that need minimal shifting", () => {
      expect(insertionSortOptimised([1, 2, 4, 3, 5, 6, 8, 7, 9, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle array with elements that need extensive shifting", () => {
      expect(insertionSortOptimised([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test("should handle array with mixed complexity patterns", () => {
      expect(insertionSortOptimised([5, 1, 9, 2, 8, 3, 7, 4, 6, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  });
});
