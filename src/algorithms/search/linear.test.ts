import { linearSearch, sentinelLinearSearch } from './linear';

describe('Linear Search', () => {
  describe('Basic functionality', () => {
    test('should return -1 for empty array', () => {
      expect(linearSearch([], 5)).toBe(-1);
    });

    test('should return 0 for single element array when target found', () => {
      expect(linearSearch([5], 5)).toBe(0);
    });

    test('should return -1 for single element array when target not found', () => {
      expect(linearSearch([5], 3)).toBe(-1);
    });
  });

  describe('Multiple elements', () => {
    test('should find element at the beginning', () => {
      expect(linearSearch([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test('should find element at the end', () => {
      expect(linearSearch([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test('should find element in the middle', () => {
      expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test('should return -1 when element not found', () => {
      expect(linearSearch([1, 2, 3, 4, 5], 6)).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    test('should handle array with duplicate elements', () => {
      expect(linearSearch([1, 2, 2, 3, 4], 2)).toBe(1); // Returns first occurrence
    });

    test('should handle array with all same elements', () => {
      expect(linearSearch([5, 5, 5, 5], 5)).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(linearSearch([-3, -1, 0, 2, 4], -1)).toBe(1);
    });

    test('should handle zero', () => {
      expect(linearSearch([1, 0, 3, 4], 0)).toBe(1);
    });
  });

  describe('Performance characteristics', () => {
    test('should work with large array', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      expect(linearSearch(largeArray, 999)).toBe(999);
      expect(linearSearch(largeArray, 1000)).toBe(-1);
    });
  });
});

describe('Sentinel Linear Search', () => {
  describe('Basic functionality', () => {
    test('should return -1 for empty array', () => {
      expect(sentinelLinearSearch([], 5)).toBe(-1);
    });

    test('should return 0 for single element array when target found', () => {
      expect(sentinelLinearSearch([5], 5)).toBe(0);
    });

    test('should return -1 for single element array when target not found', () => {
      expect(sentinelLinearSearch([5], 3)).toBe(-1);
    });
  });

  describe('Multiple elements', () => {
    test('should find element at the beginning', () => {
      expect(sentinelLinearSearch([1, 2, 3, 4, 5], 1)).toBe(0);
    });

    test('should find element at the end', () => {
      expect(sentinelLinearSearch([1, 2, 3, 4, 5], 5)).toBe(4);
    });

    test('should find element in the middle', () => {
      expect(sentinelLinearSearch([1, 2, 3, 4, 5], 3)).toBe(2);
    });

    test('should return -1 when element not found', () => {
      expect(sentinelLinearSearch([1, 2, 3, 4, 5], 6)).toBe(-1);
    });
  });

  describe('Edge cases', () => {
    test('should handle array with duplicate elements', () => {
      expect(sentinelLinearSearch([1, 2, 2, 3, 4], 2)).toBe(1); // Returns first occurrence
    });

    test('should handle array with all same elements', () => {
      expect(sentinelLinearSearch([5, 5, 5, 5], 5)).toBe(0);
    });

    test('should handle negative numbers', () => {
      expect(sentinelLinearSearch([-3, -1, 0, 2, 4], -1)).toBe(1);
    });

    test('should handle zero', () => {
      expect(sentinelLinearSearch([1, 0, 3, 4], 0)).toBe(1);
    });
  });

  describe('Performance characteristics', () => {
    test('should work with large array', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      expect(sentinelLinearSearch(largeArray, 999)).toBe(999);
      expect(sentinelLinearSearch(largeArray, 1000)).toBe(-1);
    });
  });
});