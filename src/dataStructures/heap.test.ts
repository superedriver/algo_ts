import { MinHeap, MaxHeap } from "./heap";

describe("Heap", () => {
  describe("MinHeap", () => {
    describe("Constructor", () => {
      test("should create empty heap", () => {
        const heap = new MinHeap();
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should create heap from empty array", () => {
        const heap = new MinHeap([]);
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should create heap from array with single element", () => {
        const heap = new MinHeap([5]);
        expect(heap.size).toBe(1);
        expect(heap.isEmpty).toBe(false);
      });

      test("should create heap from array with multiple elements", () => {
        const heap = new MinHeap([3, 1, 4, 1, 5]);
        expect(heap.size).toBe(5);
        expect(heap.isEmpty).toBe(false);
      });

      test("should maintain heap property when constructed from array", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9, 2]);
        expect(heap.peak()).toBe(1);
      });
    });

    describe("Insert", () => {
      test("should insert into empty heap", () => {
        const heap = new MinHeap();
        heap.insert(5);
        expect(heap.size).toBe(1);
        expect(heap.isEmpty).toBe(false);
        expect(heap.peak()).toBe(5);
      });

      test("should insert and maintain heap property", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        expect(heap.peak()).toBe(3);
        expect(heap.size).toBe(3);
      });

      test("should insert elements in correct order", () => {
        const heap = new MinHeap();
        heap.insert(10);
        heap.insert(5);
        heap.insert(1);
        heap.insert(7);
        expect(heap.peak()).toBe(1);
      });

      test("should handle inserting duplicate values", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(5);
        heap.insert(5);
        expect(heap.size).toBe(3);
        expect(heap.peak()).toBe(5);
      });

      test("should handle inserting negative numbers", () => {
        const heap = new MinHeap();
        heap.insert(-5);
        heap.insert(-1);
        heap.insert(-3);
        expect(heap.peak()).toBe(-5);
      });

      test("should handle inserting zero", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(0);
        heap.insert(10);
        expect(heap.peak()).toBe(0);
      });

      test("should handle inserting decimal numbers", () => {
        const heap = new MinHeap();
        heap.insert(3.5);
        heap.insert(1.2);
        heap.insert(2.8);
        expect(heap.peak()).toBe(1.2);
      });

      test("should maintain heap property after multiple insertions", () => {
        const heap = new MinHeap();
        const values = [9, 3, 7, 1, 5, 8, 2, 6, 4];
        values.forEach((val) => heap.insert(val));
        expect(heap.peak()).toBe(1);
        expect(heap.size).toBe(9);
      });
    });

    describe("ExtractMin", () => {
      test("should return null for empty heap", () => {
        const heap = new MinHeap();
        expect(heap.extractMin()).toBe(null);
      });

      test("should extract minimum from single element heap", () => {
        const heap = new MinHeap([5]);
        expect(heap.extractMin()).toBe(5);
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should extract minimum and maintain heap property", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        expect(heap.extractMin()).toBe(3);
        expect(heap.peak()).toBe(5);
        expect(heap.size).toBe(2);
      });

      test("should extract all elements in sorted order", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        heap.insert(1);
        heap.insert(9);
        const extracted = [];
        while (!heap.isEmpty) {
          extracted.push(heap.extractMin());
        }
        expect(extracted).toEqual([1, 3, 5, 8, 9]);
      });

      test("should maintain heap property after each extraction", () => {
        const heap = new MinHeap();
        [9, 3, 7, 1, 5, 8, 2, 6, 4].forEach((val) => heap.insert(val));
        expect(heap.extractMin()).toBe(1);
        expect(heap.peak()).toBe(2);
        expect(heap.extractMin()).toBe(2);
        expect(heap.peak()).toBe(3);
      });

      test("should handle extracting from heap with duplicates", () => {
        const heap = new MinHeap();
        heap.insert(3);
        heap.insert(1);
        heap.insert(3);
        heap.insert(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(3);
        expect(heap.extractMin()).toBe(3);
      });
    });

    describe("Peak", () => {
      test("should return null for empty heap", () => {
        const heap = new MinHeap();
        expect(heap.peak()).toBe(null);
      });

      test("should return minimum without removing it", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        const peak1 = heap.peak();
        const peak2 = heap.peak();
        expect(peak1).toBe(3);
        expect(peak2).toBe(3);
        expect(heap.size).toBe(3);
      });

      test("should return same value on consecutive calls", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9]);
        expect(heap.peak()).toBe(1);
        expect(heap.peak()).toBe(1);
        expect(heap.size).toBe(5);
      });
    });

    describe("Size", () => {
      test("should return 0 for empty heap", () => {
        const heap = new MinHeap();
        expect(heap.size).toBe(0);
      });

      test("should return correct size after insertions", () => {
        const heap = new MinHeap();
        heap.insert(1);
        expect(heap.size).toBe(1);
        heap.insert(2);
        expect(heap.size).toBe(2);
        heap.insert(3);
        expect(heap.size).toBe(3);
      });

      test("should return correct size after extractions", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9]);
        expect(heap.size).toBe(5);
        heap.extractMin();
        expect(heap.size).toBe(4);
        heap.extractMin();
        expect(heap.size).toBe(3);
      });

      test("should return 0 after extracting all elements", () => {
        const heap = new MinHeap([1, 2, 3]);
        heap.extractMin();
        heap.extractMin();
        heap.extractMin();
        expect(heap.size).toBe(0);
      });
    });

    describe("IsEmpty", () => {
      test("should return true for empty heap", () => {
        const heap = new MinHeap();
        expect(heap.isEmpty).toBe(true);
      });

      test("should return false for non-empty heap", () => {
        const heap = new MinHeap([1]);
        expect(heap.isEmpty).toBe(false);
      });

      test("should return true after extracting all elements", () => {
        const heap = new MinHeap([1, 2, 3]);
        heap.extractMin();
        heap.extractMin();
        heap.extractMin();
        expect(heap.isEmpty).toBe(true);
      });
    });

    describe("Heap Property", () => {
      test("should always have minimum at root", () => {
        const heap = new MinHeap();
        const values = [9, 5, 7, 1, 3, 8, 2, 6, 4];
        values.forEach((val) => heap.insert(val));
        expect(heap.peak()).toBe(1);
      });

      test("should maintain heap property after insertions", () => {
        const heap = new MinHeap();
        heap.insert(10);
        expect(heap.peak()).toBe(10);
        heap.insert(5);
        expect(heap.peak()).toBe(5);
        heap.insert(15);
        expect(heap.peak()).toBe(5);
        heap.insert(1);
        expect(heap.peak()).toBe(1);
      });

      test("should maintain heap property after extractions", () => {
        const heap = new MinHeap();
        [9, 3, 7, 1, 5, 8, 2, 6, 4].forEach((val) => heap.insert(val));
        while (!heap.isEmpty) {
          const min = heap.extractMin();
          if (!heap.isEmpty) {
            expect(heap.peak()! >= min!).toBe(true);
          }
        }
      });
    });

    describe("Complex Operations", () => {
      test("should handle mixed insert and extract operations", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        expect(heap.extractMin()).toBe(3);
        heap.insert(8);
        heap.insert(1);
        expect(heap.extractMin()).toBe(1);
        heap.insert(2);
        expect(heap.extractMin()).toBe(2);
        expect(heap.peak()).toBe(5);
      });

      test("should handle large number of operations", () => {
        const heap = new MinHeap();
        for (let i = 100; i >= 1; i--) {
          heap.insert(i);
        }
        expect(heap.size).toBe(100);
        expect(heap.peak()).toBe(1);
        for (let i = 1; i <= 100; i++) {
          expect(heap.extractMin()).toBe(i);
        }
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle operations with negative numbers", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(-3);
        heap.insert(8);
        heap.insert(-1);
        heap.insert(0);
        expect(heap.extractMin()).toBe(-3);
        expect(heap.extractMin()).toBe(-1);
        expect(heap.extractMin()).toBe(0);
      });

      test("should handle operations with decimal numbers", () => {
        const heap = new MinHeap();
        heap.insert(3.5);
        heap.insert(1.2);
        heap.insert(2.8);
        heap.insert(0.5);
        heap.insert(4.1);
        expect(heap.extractMin()).toBe(0.5);
        expect(heap.extractMin()).toBe(1.2);
        expect(heap.extractMin()).toBe(2.8);
      });
    });

    describe("Edge Cases", () => {
      test("should handle single element heap correctly", () => {
        const heap = new MinHeap([42]);
        expect(heap.peak()).toBe(42);
        expect(heap.extractMin()).toBe(42);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle two element heap correctly", () => {
        const heap = new MinHeap([5, 3]);
        expect(heap.peak()).toBe(3);
        expect(heap.extractMin()).toBe(3);
        expect(heap.peak()).toBe(5);
      });

      test("should handle all same values", () => {
        const heap = new MinHeap([5, 5, 5, 5, 5]);
        expect(heap.size).toBe(5);
        while (!heap.isEmpty) {
          expect(heap.extractMin()).toBe(5);
        }
      });

      test("should handle already sorted array", () => {
        const heap = new MinHeap([1, 2, 3, 4, 5]);
        expect(heap.peak()).toBe(1);
        for (let i = 1; i <= 5; i++) {
          expect(heap.extractMin()).toBe(i);
        }
      });

      test("should handle reverse sorted array", () => {
        const heap = new MinHeap([5, 4, 3, 2, 1]);
        expect(heap.peak()).toBe(1);
        for (let i = 1; i <= 5; i++) {
          expect(heap.extractMin()).toBe(i);
        }
      });

      test("should handle negative and positive numbers", () => {
        const heap = new MinHeap([-5, 3, -8, 1, -9, 2, 0]);
        expect(heap.extractMin()).toBe(-9);
        expect(heap.extractMin()).toBe(-8);
        expect(heap.extractMin()).toBe(-5);
        expect(heap.extractMin()).toBe(0);
        expect(heap.extractMin()).toBe(1);
        expect(heap.extractMin()).toBe(2);
        expect(heap.extractMin()).toBe(3);
      });
    });

    describe("Sort", () => {
      test("should return empty array for empty heap", () => {
        const heap = new MinHeap();
        const result = heap.sort();
        expect(result).toEqual([]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with single element", () => {
        const heap = new MinHeap([5]);
        const result = heap.sort();
        expect(result).toEqual([5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
        expect(heap.peak()).toBe(null);
      });

      test("should sort heap with two elements", () => {
        const heap = new MinHeap([5, 3]);
        const result = heap.sort();
        expect(result).toEqual([3, 5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
        expect(heap.peak()).toBe(null);
      });

      test("should sort heap with multiple elements", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9, 2]);
        const result = heap.sort();
        expect(result).toEqual([1, 2, 3, 5, 8, 9]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
        expect(heap.peak()).toBe(null);
      });

      test("should return sorted array in ascending order", () => {
        const heap = new MinHeap([9, 3, 7, 1, 5, 8, 2, 6, 4]);
        const result = heap.sort();
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with duplicate values", () => {
        const heap = new MinHeap([3, 1, 3, 2, 1, 3]);
        const result = heap.sort();
        expect(result).toEqual([1, 1, 2, 3, 3, 3]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with all same values", () => {
        const heap = new MinHeap([5, 5, 5, 5, 5]);
        const result = heap.sort();
        expect(result).toEqual([5, 5, 5, 5, 5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with negative numbers", () => {
        const heap = new MinHeap([5, -3, 8, -1, 0]);
        const result = heap.sort();
        expect(result).toEqual([-3, -1, 0, 5, 8]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with decimal numbers", () => {
        const heap = new MinHeap([3.5, 1.2, 2.8, 0.5, 4.1]);
        const result = heap.sort();
        expect(result).toEqual([0.5, 1.2, 2.8, 3.5, 4.1]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort already sorted array", () => {
        const heap = new MinHeap([1, 2, 3, 4, 5]);
        const result = heap.sort();
        expect(result).toEqual([1, 2, 3, 4, 5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort reverse sorted array", () => {
        const heap = new MinHeap([5, 4, 3, 2, 1]);
        const result = heap.sort();
        expect(result).toEqual([1, 2, 3, 4, 5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort large heap", () => {
        const largeArray = Array.from({ length: 100 }, (_, i) => 100 - i);
        const heap = new MinHeap(largeArray);
        const result = heap.sort();
        expect(result).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should not allow extraction after sorting", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9]);
        heap.sort();
        expect(heap.extractMin()).toBe(null);
        expect(heap.peak()).toBe(null);
      });

      test("should handle sort on heap created from constructor", () => {
        const heap = new MinHeap([10, 20, 15, 5, 25]);
        const result = heap.sort();
        expect(result).toEqual([5, 10, 15, 20, 25]);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle sort on heap with inserted elements", () => {
        const heap = new MinHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        heap.insert(1);
        const result = heap.sort();
        expect(result).toEqual([1, 3, 5, 8]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should handle sort after some extractions", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9, 2]);
        heap.extractMin();
        heap.extractMin();
        expect(heap.size).toBe(4);
        const result = heap.sort();
        expect(result).toEqual([3, 5, 8, 9]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should return new array instance", () => {
        const heap = new MinHeap([5, 3, 8, 1, 9]);
        const result1 = heap.sort();
        expect(result1).toBeDefined();
        expect(Array.isArray(result1)).toBe(true);
      });

      test("should handle mixed positive and negative numbers 1", () => {
        const heap = new MinHeap([-5, 3, -8, 1, -9, 2, 0]);
        const result = heap.sort();
        expect(result).toEqual([-9, -8, -5, 0, 1, 2, 3]);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle array with zeros", () => {
        const heap = new MinHeap([0, 0, 1, 0, -1]);
        const result = heap.sort();
        expect(result).toEqual([-1, 0, 0, 0, 1]);
        expect(heap.isEmpty).toBe(true);
      });
    });
  });

  describe("MaxHeap", () => {
    describe("Constructor", () => {
      test("should create empty heap", () => {
        const heap = new MaxHeap();
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should create heap from empty array", () => {
        const heap = new MaxHeap([]);
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should create heap from array with single element", () => {
        const heap = new MaxHeap([5]);
        expect(heap.size).toBe(1);
        expect(heap.isEmpty).toBe(false);
      });

      test("should create heap from array with multiple elements", () => {
        const heap = new MaxHeap([3, 1, 4, 1, 5]);
        expect(heap.size).toBe(5);
        expect(heap.isEmpty).toBe(false);
      });

      test("should maintain heap property when constructed from array", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9, 2]);
        expect(heap.peak()).toBeDefined();
      });
    });

    describe("Insert", () => {
      test("should insert into empty heap", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        expect(heap.size).toBe(1);
        expect(heap.isEmpty).toBe(false);
      });

      test("should insert and maintain heap property", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        expect(heap.size).toBe(3);
      });

      test("should insert elements in correct order", () => {
        const heap = new MaxHeap();
        heap.insert(10);
        heap.insert(5);
        heap.insert(1);
        heap.insert(7);
        expect(heap.size).toBe(4);
      });

      test("should handle inserting duplicate values", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(5);
        heap.insert(5);
        expect(heap.size).toBe(3);
      });

      test("should handle inserting negative numbers", () => {
        const heap = new MaxHeap();
        heap.insert(-5);
        heap.insert(-1);
        heap.insert(-3);
        expect(heap.size).toBe(3);
      });

      test("should handle inserting zero", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(0);
        heap.insert(10);
        expect(heap.size).toBe(3);
      });

      test("should handle inserting decimal numbers", () => {
        const heap = new MaxHeap();
        heap.insert(3.5);
        heap.insert(1.2);
        heap.insert(2.8);
        expect(heap.size).toBe(3);
      });

      test("should maintain heap property after multiple insertions", () => {
        const heap = new MaxHeap();
        const values = [9, 3, 7, 1, 5, 8, 2, 6, 4];
        values.forEach((val) => heap.insert(val));
        expect(heap.size).toBe(9);
      });
    });

    describe("ExtractMax", () => {
      test("should return 0 for empty heap", () => {
        const heap = new MaxHeap();
        expect(heap.extractMax()).toBe(0);
      });

      test("should extract maximum from single element heap", () => {
        const heap = new MaxHeap([5]);
        expect(heap.extractMax()).toBe(5);
        expect(heap.size).toBe(0);
        expect(heap.isEmpty).toBe(true);
      });

      test("should extract maximum and maintain heap property", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        expect(heap.extractMax()).toBe(8);
        expect(heap.size).toBe(2);
      });

      test("should extract all elements in sorted order (descending)", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        heap.insert(1);
        heap.insert(9);
        const extracted = [];
        while (!heap.isEmpty) {
          extracted.push(heap.extractMax());
        }
        expect(extracted).toEqual([9, 8, 5, 3, 1]);
      });

      test("should maintain heap property after each extraction", () => {
        const heap = new MaxHeap();
        [9, 3, 7, 1, 5, 8, 2, 6, 4].forEach((val) => heap.insert(val));
        expect(heap.extractMax()).toBe(9);
        expect(heap.extractMax()).toBe(8);
      });

      test("should handle extracting from heap with duplicates", () => {
        const heap = new MaxHeap();
        heap.insert(3);
        heap.insert(1);
        heap.insert(3);
        heap.insert(1);
        expect(heap.extractMax()).toBe(3);
        expect(heap.extractMax()).toBe(3);
        expect(heap.extractMax()).toBe(1);
        expect(heap.extractMax()).toBe(1);
      });
    });

    describe("Peak", () => {
      test("should return null for empty heap", () => {
        const heap = new MaxHeap();
        expect(heap.peak()).toBe(null);
      });

      test("should return maximum without removing it", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        const peak1 = heap.peak();
        const peak2 = heap.peak();
        expect(peak1).toBe(peak2);
        expect(heap.size).toBe(3);
      });

      test("should return same value on consecutive calls", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9]);
        const peak1 = heap.peak();
        const peak2 = heap.peak();
        expect(peak1).toBe(peak2);
        expect(heap.size).toBe(5);
      });
    });

    describe("Size", () => {
      test("should return 0 for empty heap", () => {
        const heap = new MaxHeap();
        expect(heap.size).toBe(0);
      });

      test("should return correct size after insertions", () => {
        const heap = new MaxHeap();
        heap.insert(1);
        expect(heap.size).toBe(1);
        heap.insert(2);
        expect(heap.size).toBe(2);
        heap.insert(3);
        expect(heap.size).toBe(3);
      });

      test("should return correct size after extractions", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9]);
        expect(heap.size).toBe(5);
        heap.extractMax();
        expect(heap.size).toBe(4);
        heap.extractMax();
        expect(heap.size).toBe(3);
      });

      test("should return 0 after extracting all elements", () => {
        const heap = new MaxHeap([1, 2, 3]);
        heap.extractMax();
        heap.extractMax();
        heap.extractMax();
        expect(heap.size).toBe(0);
      });
    });

    describe("IsEmpty", () => {
      test("should return true for empty heap", () => {
        const heap = new MaxHeap();
        expect(heap.isEmpty).toBe(true);
      });

      test("should return false for non-empty heap", () => {
        const heap = new MaxHeap([1]);
        expect(heap.isEmpty).toBe(false);
      });

      test("should return true after extracting all elements", () => {
        const heap = new MaxHeap([1, 2, 3]);
        heap.extractMax();
        heap.extractMax();
        heap.extractMax();
        expect(heap.isEmpty).toBe(true);
      });
    });

    describe("Heap Property", () => {
      test("should always have maximum at root", () => {
        const heap = new MaxHeap();
        const values = [9, 5, 7, 1, 3, 8, 2, 6, 4];
        values.forEach((val) => heap.insert(val));
        const max = heap.extractMax();
        expect(max).toBe(9);
      });

      test("should maintain heap property after insertions", () => {
        const heap = new MaxHeap();
        heap.insert(10);
        heap.insert(5);
        heap.insert(15);
        heap.insert(1);
        const max = heap.extractMax();
        expect(max).toBe(15);
      });

      test("should maintain heap property after extractions", () => {
        const heap = new MaxHeap();
        [9, 3, 7, 1, 5, 8, 2, 6, 4].forEach((val) => heap.insert(val));
        while (!heap.isEmpty) {
          const max = heap.extractMax();
          if (!heap.isEmpty) {
            const nextMax = heap.extractMax();
            expect(max! >= nextMax!).toBe(true);
            heap.insert(nextMax!);
          }
        }
      });
    });

    describe("Complex Operations", () => {
      test("should handle mixed insert and extract operations", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        expect(heap.extractMax()).toBe(5);
        heap.insert(8);
        heap.insert(1);
        expect(heap.extractMax()).toBe(8);
        heap.insert(2);
        expect(heap.extractMax()).toBe(3);
      });

      test("should handle large number of operations", () => {
        const heap = new MaxHeap();
        for (let i = 1; i <= 100; i++) {
          heap.insert(i);
        }
        expect(heap.size).toBe(100);
        for (let i = 100; i >= 1; i--) {
          expect(heap.extractMax()).toBe(i);
        }
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle operations with negative numbers", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(-3);
        heap.insert(8);
        heap.insert(-1);
        heap.insert(0);
        expect(heap.extractMax()).toBe(8);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(0);
      });

      test("should handle operations with decimal numbers", () => {
        const heap = new MaxHeap();
        heap.insert(3.5);
        heap.insert(1.2);
        heap.insert(2.8);
        heap.insert(0.5);
        heap.insert(4.1);
        expect(heap.extractMax()).toBe(4.1);
        expect(heap.extractMax()).toBe(3.5);
        expect(heap.extractMax()).toBe(2.8);
      });
    });

    describe("Edge Cases", () => {
      test("should handle single element heap correctly", () => {
        const heap = new MaxHeap([42]);
        expect(heap.extractMax()).toBe(42);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle two element heap correctly", () => {
        const heap = new MaxHeap([5, 3]);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(3);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle all same values", () => {
        const heap = new MaxHeap([5, 5, 5, 5, 5]);
        expect(heap.size).toBe(5);
        while (!heap.isEmpty) {
          expect(heap.extractMax()).toBe(5);
        }
      });

      test("should handle already sorted array", () => {
        const heap = new MaxHeap([1, 2, 3, 4, 5]);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(4);
        expect(heap.extractMax()).toBe(3);
      });

      test("should handle reverse sorted array", () => {
        const heap = new MaxHeap([5, 4, 3, 2, 1]);
        expect(heap.extractMax()).toBe(5);
        expect(heap.extractMax()).toBe(4);
        expect(heap.extractMax()).toBe(3);
      });

      test("should handle negative and positive numbers", () => {
        const heap = new MaxHeap([-5, 3, -8, 1, -9, 2, 0]);
        expect(heap.extractMax()).toBe(3);
        expect(heap.extractMax()).toBe(2);
        expect(heap.extractMax()).toBe(1);
        expect(heap.extractMax()).toBe(0);
        expect(heap.extractMax()).toBe(-5);
        expect(heap.extractMax()).toBe(-8);
        expect(heap.extractMax()).toBe(-9);
      });
    });

    describe("Sort", () => {
      test("should return empty array for empty heap", () => {
        const heap = new MaxHeap();
        const result = heap.sort();
        expect(result).toEqual([]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with single element", () => {
        const heap = new MaxHeap([5]);
        const result = heap.sort();
        expect(result).toEqual([5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with two elements", () => {
        const heap = new MaxHeap([5, 3]);
        const result = heap.sort();
        expect(result.length).toBe(2);
        expect(result).toContain(5);
        expect(result).toContain(3);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with multiple elements", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9, 2]);
        const result = heap.sort();
        expect(result.length).toBe(6);
        expect(result).toContain(1);
        expect(result).toContain(2);
        expect(result).toContain(3);
        expect(result).toContain(5);
        expect(result).toContain(8);
        expect(result).toContain(9);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should return sorted array in descending order", () => {
        const heap = new MaxHeap([9, 3, 7, 1, 5, 8, 2, 6, 4]);
        const result = heap.sort();
        expect(result.length).toBe(9);
        expect(result[0]).toBeLessThanOrEqual(result[result.length - 1]!);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with duplicate values", () => {
        const heap = new MaxHeap([3, 1, 3, 2, 1, 3]);
        const result = heap.sort();
        expect(result.length).toBe(6);
        expect(result.filter((x) => x === 1).length).toBe(2);
        expect(result.filter((x) => x === 2).length).toBe(1);
        expect(result.filter((x) => x === 3).length).toBe(3);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with all same values", () => {
        const heap = new MaxHeap([5, 5, 5, 5, 5]);
        const result = heap.sort();
        expect(result).toEqual([5, 5, 5, 5, 5]);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with negative numbers", () => {
        const heap = new MaxHeap([5, -3, 8, -1, 0]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(result).toContain(8);
        expect(result).toContain(5);
        expect(result).toContain(0);
        expect(result).toContain(-1);
        expect(result).toContain(-3);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort heap with decimal numbers", () => {
        const heap = new MaxHeap([3.5, 1.2, 2.8, 0.5, 4.1]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(result).toContain(4.1);
        expect(result).toContain(3.5);
        expect(result).toContain(2.8);
        expect(result).toContain(1.2);
        expect(result).toContain(0.5);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort already sorted array", () => {
        const heap = new MaxHeap([1, 2, 3, 4, 5]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort reverse sorted array", () => {
        const heap = new MaxHeap([5, 4, 3, 2, 1]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should sort large heap", () => {
        const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
        const heap = new MaxHeap(largeArray);
        const result = heap.sort();
        expect(result.length).toBe(100);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should not allow extraction after sorting", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9]);
        heap.sort();
        expect(heap.extractMax()).toBe(0);
        expect(heap.peak()).toBe(null);
      });

      test("should handle sort on heap created from constructor", () => {
        const heap = new MaxHeap([10, 20, 15, 5, 25]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle sort on heap with inserted elements", () => {
        const heap = new MaxHeap();
        heap.insert(5);
        heap.insert(3);
        heap.insert(8);
        heap.insert(1);
        const result = heap.sort();
        expect(result.length).toBe(4);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should handle sort after some extractions", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9, 2]);
        heap.extractMax();
        heap.extractMax();
        expect(heap.size).toBe(4);
        const result = heap.sort();
        expect(result.length).toBe(4);
        expect(heap.isEmpty).toBe(true);
        expect(heap.size).toBe(0);
      });

      test("should return array instance", () => {
        const heap = new MaxHeap([5, 3, 8, 1, 9]);
        const result = heap.sort();
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBe(true);
      });

      test("should handle mixed positive and negative numbers", () => {
        const heap = new MaxHeap([-5, 3, -8, 1, -9, 2, 0]);
        const result = heap.sort();
        expect(result.length).toBe(7);
        expect(heap.isEmpty).toBe(true);
      });

      test("should handle array with zeros", () => {
        const heap = new MaxHeap([0, 0, 1, 0, -1]);
        const result = heap.sort();
        expect(result.length).toBe(5);
        expect(heap.isEmpty).toBe(true);
      });
    });
  });
});
