import { MinHeap } from "./heap";

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
        console.log("heap.heap: ", heap.heap);
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
    });
  });
});
