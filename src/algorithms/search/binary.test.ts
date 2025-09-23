import { binarySearch, binarySearchFirstEntry, binarySearchLastEntry } from "./binary";

describe("Binary Search", () => {
  describe("Basic functionality", () => {
    test("should return 0 for empty array", () => {
      expect(binarySearch([], 5)).toBe(0);
    });

    test("should return 0 for single element array when target found", () => {
      expect(binarySearch([5], 5)).toBe(0);
    });

    test("should return 0 for single element array when target not found (insertion point)", () => {
      expect(binarySearch([5], 3)).toBe(0);
    });

    test("should return 1 for single element array when target is larger", () => {
      expect(binarySearch([5], 7)).toBe(1);
    });
  });

  describe("Multiple elements - exact matches", () => {
    test("should find element at the beginning", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test("should find element at the end", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test("should find element in the middle", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test("should find first occurrence of duplicate elements", () => {
      expect(binarySearch([1, 2, 2, 2, 3, 4], 2)).toBe(1);
    });
  });

  describe("Insertion points", () => {
    test("should return 0 when target is smaller than all elements", () => {
      expect(binarySearch([2, 3, 4, 5], 1)).toBe(0);
    });

    test("should return array length when target is larger than all elements", () => {
      expect(binarySearch([1, 2, 3, 4], 5)).toBe(4);
    });

    test("should return correct insertion point in the middle", () => {
      expect(binarySearch([1, 3, 5, 7, 9], 4)).toBe(2);
    });

    test("should return correct insertion point for duplicate values", () => {
      expect(binarySearch([1, 2, 2, 2, 5], 2)).toBe(1); // First occurrence
      expect(binarySearch([1, 2, 2, 2, 5], 3)).toBe(4); // Insertion point
    });
  });

  describe("Edge cases", () => {
    test("should handle array with all same elements", () => {
      expect(binarySearch([5, 5, 5, 5], 5)).toBe(0);
      expect(binarySearch([5, 5, 5, 5], 3)).toBe(0);
      expect(binarySearch([5, 5, 5, 5], 7)).toBe(4);
    });

    test("should handle negative numbers", () => {
      expect(binarySearch([-5, -3, -1, 0, 2, 4], -1)).toBe(2);
      expect(binarySearch([-5, -3, -1, 0, 2, 4], -2)).toBe(2);
    });

    test("should handle zero", () => {
      expect(binarySearch([-2, -1, 0, 1, 2], 0)).toBe(2);
      expect(binarySearch([-2, -1, 1, 2], 0)).toBe(2);
    });

    test("should handle large numbers", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binarySearch(largeArray, 500)).toBe(250);
      expect(binarySearch(largeArray, 501)).toBe(251);
    });
  });

  describe("Performance characteristics", () => {
    test("should work with large array", () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i);
      expect(binarySearch(largeArray, 5000)).toBe(5000);
      expect(binarySearch(largeArray, 10000)).toBe(10000);
    });

    test("should maintain O(log n) complexity", () => {
      const sizes = [1000, 10000, 100000];
      const times: number[] = [];

      sizes.forEach((size) => {
        const arr = Array.from({ length: size }, (_, i) => i);
        
        // Run multiple times and take average for stability
        const iterations = 10;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
          const start = performance.now();
          binarySearch(arr, Math.floor(size / 2));
          const end = performance.now();
          totalTime += end - start;
        }
        
        times.push(totalTime / iterations);
      });

      // More lenient thresholds for logarithmic growth
      expect(times[1]! / times[0]!).toBeLessThan(3); // Should not triple
      expect(times[2]! / times[1]!).toBeLessThan(3); // Should not triple
    });
  });

  describe("Real-world scenarios", () => {
    test("should work with sorted user IDs", () => {
      const userIds = [1, 5, 10, 15, 20, 25, 30];
      expect(binarySearch(userIds, 15)).toBe(3);
      expect(binarySearch(userIds, 12)).toBe(3); // Insertion point
    });

    test("should work with timestamps", () => {
      const timestamps = [1609459200, 1609545600, 1609632000, 1609718400];
      expect(binarySearch(timestamps, 1609632000)).toBe(2);
      expect(binarySearch(timestamps, 1609500000)).toBe(1); // Insertion point
    });

    test("should work with floating point numbers", () => {
      const prices = [1.99, 2.49, 3.99, 4.99, 9.99];
      expect(binarySearch(prices, 3.99)).toBe(2);
      expect(binarySearch(prices, 3.5)).toBe(2); // Insertion point
    });
  });
});

describe("Binary Search First Entry", () => {
  describe("Basic functionality", () => {
    test("should return -1 for empty array", () => {
      expect(binarySearchFirstEntry([], 5)).toBe(-1);
    });

    test("should return 0 for single element array when target found", () => {
      expect(binarySearchFirstEntry([5], 5)).toBe(0);
    });

    test("should return -1 for single element array when target not found", () => {
      expect(binarySearchFirstEntry([5], 3)).toBe(-1);
    });

    test("should return -1 for single element array when target is larger", () => {
      expect(binarySearchFirstEntry([5], 7)).toBe(-1);
    });
  });

  describe("Multiple elements - exact matches", () => {
    test("should find element at the beginning", () => {
      expect(binarySearchFirstEntry([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test("should find element at the end", () => {
      expect(binarySearchFirstEntry([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test("should find element in the middle", () => {
      expect(binarySearchFirstEntry([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test("should find first occurrence of duplicate elements", () => {
      expect(binarySearchFirstEntry([1, 2, 2, 2, 3, 4], 2)).toBe(1);
    });
  });

  describe("No matches", () => {
    test("should return -1 when target is smaller than all elements", () => {
      expect(binarySearchFirstEntry([2, 3, 4, 5], 1)).toBe(-1);
    });

    test("should return -1 when target is larger than all elements", () => {
      expect(binarySearchFirstEntry([1, 2, 3, 4], 5)).toBe(-1);
    });

    test("should return -1 for target in the middle that does not exist", () => {
      expect(binarySearchFirstEntry([1, 3, 5, 7, 9], 4)).toBe(-1);
    });

    test("should return -1 for target between duplicate values", () => {
      expect(binarySearchFirstEntry([1, 2, 2, 2, 5], 3)).toBe(-1);
    });
  });

  describe("Duplicate elements", () => {
    test("should find first occurrence of multiple duplicates", () => {
      expect(binarySearchFirstEntry([1, 2, 2, 2, 2, 3, 4], 2)).toBe(1);
    });

    test("should find first occurrence at the beginning", () => {
      expect(binarySearchFirstEntry([1, 1, 1, 2, 3], 1)).toBe(0);
    });

    test("should find first occurrence at the end", () => {
      expect(binarySearchFirstEntry([1, 2, 3, 4, 4, 4], 4)).toBe(3);
    });

    test("should handle array with all same elements", () => {
      expect(binarySearchFirstEntry([5, 5, 5, 5], 5)).toBe(0);
    });

    test("should return -1 for array with all same elements when target different", () => {
      expect(binarySearchFirstEntry([5, 5, 5, 5], 3)).toBe(-1);
    });
  });

  describe("Edge cases", () => {
    test("should handle negative numbers", () => {
      expect(binarySearchFirstEntry([-5, -3, -1, 0, 2, 4], -1)).toBe(2);
      expect(binarySearchFirstEntry([-5, -3, -1, 0, 2, 4], -2)).toBe(-1);
    });

    test("should handle zero", () => {
      expect(binarySearchFirstEntry([-2, -1, 0, 1, 2], 0)).toBe(2);
      expect(binarySearchFirstEntry([-2, -1, 1, 2], 0)).toBe(-1);
    });

    test("should handle large numbers", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binarySearchFirstEntry(largeArray, 500)).toBe(250);
      expect(binarySearchFirstEntry(largeArray, 501)).toBe(-1);
    });

    test("should handle floating point numbers", () => {
      const prices = [1.99, 2.49, 3.99, 4.99, 9.99];
      expect(binarySearchFirstEntry(prices, 3.99)).toBe(2);
      expect(binarySearchFirstEntry(prices, 3.5)).toBe(-1);
    });
  });

  describe("Performance characteristics", () => {
    test("should work with large array", () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i);
      expect(binarySearchFirstEntry(largeArray, 5000)).toBe(5000);
      expect(binarySearchFirstEntry(largeArray, 10000)).toBe(-1);
    });

    test("should maintain O(log n) complexity", () => {
      const sizes = [1000, 10000, 100000];
      const times: number[] = [];

      sizes.forEach((size) => {
        const arr = Array.from({ length: size }, (_, i) => i);
        
        // Run multiple times and take average for stability
        const iterations = 10;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
          const start = performance.now();
          binarySearchFirstEntry(arr, Math.floor(size / 2));
          const end = performance.now();
          totalTime += end - start;
        }
        
        times.push(totalTime / iterations);
      });

      // More lenient thresholds for logarithmic growth
      expect(times[1]! / times[0]!).toBeLessThan(3); // Should not triple
      expect(times[2]! / times[1]!).toBeLessThan(3); // Should not triple
    });
  });

  describe("Real-world scenarios", () => {
    test("should work with sorted user IDs", () => {
      const userIds = [1, 5, 10, 15, 20, 25, 30];
      expect(binarySearchFirstEntry(userIds, 15)).toBe(3);
      expect(binarySearchFirstEntry(userIds, 12)).toBe(-1);
    });

    test("should work with timestamps", () => {
      const timestamps = [1609459200, 1609545600, 1609632000, 1609718400];
      expect(binarySearchFirstEntry(timestamps, 1609632000)).toBe(2);
      expect(binarySearchFirstEntry(timestamps, 1609500000)).toBe(-1);
    });

    test("should work with string-like numeric IDs", () => {
      const ids = [100, 200, 200, 200, 300, 400];
      expect(binarySearchFirstEntry(ids, 200)).toBe(1);
      expect(binarySearchFirstEntry(ids, 250)).toBe(-1);
    });
  });

  describe("Complex duplicate scenarios", () => {
    test("should find first occurrence in complex duplicate pattern", () => {
      const arr = [1, 2, 2, 2, 3, 3, 3, 4, 4, 5];
      expect(binarySearchFirstEntry(arr, 2)).toBe(1);
      expect(binarySearchFirstEntry(arr, 3)).toBe(4);
      expect(binarySearchFirstEntry(arr, 4)).toBe(7);
    });

    test("should handle alternating duplicates", () => {
      const arr = [1, 1, 2, 2, 3, 3, 4, 4];
      expect(binarySearchFirstEntry(arr, 1)).toBe(0);
      expect(binarySearchFirstEntry(arr, 2)).toBe(2);
      expect(binarySearchFirstEntry(arr, 3)).toBe(4);
      expect(binarySearchFirstEntry(arr, 4)).toBe(6);
    });

    test("should return -1 for non-existent values in duplicate array", () => {
      const arr = [1, 1, 1, 3, 3, 3, 5, 5, 5];
      expect(binarySearchFirstEntry(arr, 2)).toBe(-1);
      expect(binarySearchFirstEntry(arr, 4)).toBe(-1);
      expect(binarySearchFirstEntry(arr, 6)).toBe(-1);
    });
  });
});

describe("Binary Search Last Entry", () => {
  describe("Basic functionality", () => {
    test("should return -1 for empty array", () => {
      expect(binarySearchLastEntry([], 5)).toBe(-1);
    });

    test("should return 0 for single element array when target found", () => {
      expect(binarySearchLastEntry([5], 5)).toBe(0);
    });

    test("should return -1 for single element array when target not found", () => {
      expect(binarySearchLastEntry([5], 3)).toBe(-1);
    });

    test("should return -1 for single element array when target is larger", () => {
      expect(binarySearchLastEntry([5], 7)).toBe(-1);
    });
  });

  describe("Multiple elements - exact matches", () => {
    test("should find element at the beginning", () => {
      expect(binarySearchLastEntry([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test("should find element at the end", () => {
      expect(binarySearchLastEntry([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test("should find element in the middle", () => {
      expect(binarySearchLastEntry([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test("should find last occurrence of duplicate elements", () => {
      expect(binarySearchLastEntry([1, 2, 2, 2, 3, 4], 2)).toBe(3);
    });
  });

  describe("No matches", () => {
    test("should return -1 when target is smaller than all elements", () => {
      expect(binarySearchLastEntry([2, 3, 4, 5], 1)).toBe(-1);
    });

    test("should return -1 when target is larger than all elements", () => {
      expect(binarySearchLastEntry([1, 2, 3, 4], 5)).toBe(-1);
    });

    test("should return -1 for target in the middle that does not exist", () => {
      expect(binarySearchLastEntry([1, 3, 5, 7, 9], 4)).toBe(-1);
    });

    test("should return -1 for target between duplicate values", () => {
      expect(binarySearchLastEntry([1, 2, 2, 2, 5], 3)).toBe(-1);
    });
  });

  describe("Duplicate elements", () => {
    test("should find last occurrence of multiple duplicates", () => {
      expect(binarySearchLastEntry([1, 2, 2, 2, 2, 3, 4], 2)).toBe(4);
    });

    test("should find last occurrence at the beginning", () => {
      expect(binarySearchLastEntry([1, 1, 1, 2, 3], 1)).toBe(2);
    });

    test("should find last occurrence at the end", () => {
      expect(binarySearchLastEntry([1, 2, 3, 4, 4, 4], 4)).toBe(5);
    });

    test("should handle array with all same elements", () => {
      expect(binarySearchLastEntry([5, 5, 5, 5], 5)).toBe(3);
    });

    test("should return -1 for array with all same elements when target different", () => {
      expect(binarySearchLastEntry([5, 5, 5, 5], 3)).toBe(-1);
    });
  });

  describe("Edge cases", () => {
    test("should handle negative numbers", () => {
      expect(binarySearchLastEntry([-5, -3, -1, 0, 2, 4], -1)).toBe(2);
      expect(binarySearchLastEntry([-5, -3, -1, 0, 2, 4], -2)).toBe(-1);
    });

    test("should handle zero", () => {
      expect(binarySearchLastEntry([-2, -1, 0, 1, 2], 0)).toBe(2);
      expect(binarySearchLastEntry([-2, -1, 1, 2], 0)).toBe(-1);
    });

    test("should handle large numbers", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i * 2);
      expect(binarySearchLastEntry(largeArray, 500)).toBe(250);
      expect(binarySearchLastEntry(largeArray, 501)).toBe(-1);
    });

    test("should handle floating point numbers", () => {
      const prices = [1.99, 2.49, 3.99, 4.99, 9.99];
      expect(binarySearchLastEntry(prices, 3.99)).toBe(2);
      expect(binarySearchLastEntry(prices, 3.5)).toBe(-1);
    });
  });

  describe("Performance characteristics", () => {
    test("should work with large array", () => {
      const largeArray = Array.from({ length: 10000 }, (_, i) => i);
      expect(binarySearchLastEntry(largeArray, 5000)).toBe(5000);
      expect(binarySearchLastEntry(largeArray, 10000)).toBe(-1);
    });

    test("should maintain O(log n) complexity", () => {
      const sizes = [1000, 10000, 100000];
      const times: number[] = [];

      sizes.forEach((size) => {
        const arr = Array.from({ length: size }, (_, i) => i);
        
        // Run multiple times and take average for stability
        const iterations = 10;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
          const start = performance.now();
          binarySearchLastEntry(arr, Math.floor(size / 2));
          const end = performance.now();
          totalTime += end - start;
        }
        
        times.push(totalTime / iterations);
      });

      // More lenient thresholds for logarithmic growth
      expect(times[1]! / times[0]!).toBeLessThan(3); // Should not triple
      expect(times[2]! / times[1]!).toBeLessThan(3); // Should not triple
    });
  });

  describe("Real-world scenarios", () => {
    test("should work with sorted user IDs", () => {
      const userIds = [1, 5, 10, 15, 20, 25, 30];
      expect(binarySearchLastEntry(userIds, 15)).toBe(3);
      expect(binarySearchLastEntry(userIds, 12)).toBe(-1);
    });

    test("should work with timestamps", () => {
      const timestamps = [1609459200, 1609545600, 1609632000, 1609718400];
      expect(binarySearchLastEntry(timestamps, 1609632000)).toBe(2);
      expect(binarySearchLastEntry(timestamps, 1609500000)).toBe(-1);
    });

    test("should work with string-like numeric IDs", () => {
      const ids = [100, 200, 200, 200, 300, 400];
      expect(binarySearchLastEntry(ids, 200)).toBe(3);
      expect(binarySearchLastEntry(ids, 250)).toBe(-1);
    });
  });

  describe("Complex duplicate scenarios", () => {
    test("should find last occurrence in complex duplicate pattern", () => {
      const arr = [1, 2, 2, 2, 3, 3, 3, 4, 4, 5];
      expect(binarySearchLastEntry(arr, 2)).toBe(3);
      expect(binarySearchLastEntry(arr, 3)).toBe(6);
      expect(binarySearchLastEntry(arr, 4)).toBe(8);
    });

    test("should handle alternating duplicates", () => {
      const arr = [1, 1, 2, 2, 3, 3, 4, 4];
      expect(binarySearchLastEntry(arr, 1)).toBe(1);
      expect(binarySearchLastEntry(arr, 2)).toBe(3);
      expect(binarySearchLastEntry(arr, 3)).toBe(5);
      expect(binarySearchLastEntry(arr, 4)).toBe(7);
    });

    test("should return -1 for non-existent values in duplicate array", () => {
      const arr = [1, 1, 1, 3, 3, 3, 5, 5, 5];
      expect(binarySearchLastEntry(arr, 2)).toBe(-1);
      expect(binarySearchLastEntry(arr, 4)).toBe(-1);
      expect(binarySearchLastEntry(arr, 6)).toBe(-1);
    });

    test("should handle multiple groups of duplicates", () => {
      const arr = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4];
      expect(binarySearchLastEntry(arr, 1)).toBe(2);
      expect(binarySearchLastEntry(arr, 2)).toBe(4);
      expect(binarySearchLastEntry(arr, 3)).toBe(8);
      expect(binarySearchLastEntry(arr, 4)).toBe(10);
    });
  });
});
