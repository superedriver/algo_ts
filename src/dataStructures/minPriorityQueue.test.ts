import { MinPriorityQueue } from "./minPriorityQueue";

const numberComparator = (a: number, b: number) => a - b;

interface FrequencyCode {
  frequency: number;
  code: string;
}
const frequencyComparator = (a: FrequencyCode, b: FrequencyCode) =>
  a.frequency - b.frequency;

describe("MinPriorityQueue", () => {
  describe("Constructor", () => {
    test("should create empty queue", () => {
      const queue = new MinPriorityQueue([], numberComparator);
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });

    test("should create queue from empty array", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });

    test("should create queue from array with single element", () => {
      const queue = new MinPriorityQueue([5], numberComparator);
      expect(queue.size).toBe(1);
      expect(queue.isEmpty).toBe(false);
    });

    test("should create queue from array with multiple elements", () => {
      const queue = new MinPriorityQueue([3, 1, 4, 1, 5], numberComparator);
      expect(queue.size).toBe(5);
      expect(queue.isEmpty).toBe(false);
    });

    test("should maintain heap property when constructed from array", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9, 2], numberComparator);
      expect(queue.peak()).toBe(1);
    });
  });

  describe("Insert", () => {
    test("should insert into empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      expect(queue.size).toBe(1);
      expect(queue.isEmpty).toBe(false);
      expect(queue.peak()).toBe(5);
    });

    test("should insert and maintain heap property", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      expect(queue.peak()).toBe(3);
      expect(queue.size).toBe(3);
    });

    test("should insert elements in correct order", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(10);
      queue.insert(5);
      queue.insert(1);
      queue.insert(7);
      expect(queue.peak()).toBe(1);
    });

    test("should handle inserting duplicate values", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(5);
      queue.insert(5);
      expect(queue.size).toBe(3);
      expect(queue.peak()).toBe(5);
    });

    test("should handle inserting negative numbers", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(-5);
      queue.insert(-1);
      queue.insert(-3);
      expect(queue.peak()).toBe(-5);
    });

    test("should handle inserting zero", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(0);
      queue.insert(10);
      expect(queue.peak()).toBe(0);
    });

    test("should handle inserting decimal numbers", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(3.5);
      queue.insert(1.2);
      queue.insert(2.8);
      expect(queue.peak()).toBe(1.2);
    });

    test("should maintain heap property after multiple insertions", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      const values = [9, 3, 7, 1, 5, 8, 2, 6, 4];
      values.forEach((val) => queue.insert(val));
      expect(queue.peak()).toBe(1);
      expect(queue.size).toBe(9);
    });
  });

  describe("ExtractMin", () => {
    test("should return null for empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      expect(queue.extractMin()).toBe(null);
    });

    test("should extract minimum from single element queue", () => {
      const queue = new MinPriorityQueue([5], numberComparator);
      expect(queue.extractMin()).toBe(5);
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });

    test("should extract minimum and maintain heap property", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      expect(queue.extractMin()).toBe(3);
      expect(queue.peak()).toBe(5);
      expect(queue.size).toBe(2);
    });

    test("should extract all elements in sorted order", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      queue.insert(1);
      queue.insert(9);
      const extracted: number[] = [];
      while (!queue.isEmpty) {
        extracted.push(queue.extractMin()!);
      }
      expect(extracted).toEqual([1, 3, 5, 8, 9]);
    });

    test("should maintain heap property after each extraction", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      [9, 3, 7, 1, 5, 8, 2, 6, 4].forEach((val) => queue.insert(val));
      expect(queue.extractMin()).toBe(1);
      expect(queue.peak()).toBe(2);
      expect(queue.extractMin()).toBe(2);
      expect(queue.peak()).toBe(3);
    });

    test("should handle extracting from queue with duplicates", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(3);
      queue.insert(1);
      queue.insert(3);
      queue.insert(1);
      expect(queue.extractMin()).toBe(1);
      expect(queue.extractMin()).toBe(1);
      expect(queue.extractMin()).toBe(3);
      expect(queue.extractMin()).toBe(3);
    });
  });

  describe("Peak", () => {
    test("should return null for empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      expect(queue.peak()).toBe(null);
    });

    test("should return minimum without removing it", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      const peak1 = queue.peak();
      const peak2 = queue.peak();
      expect(peak1).toBe(3);
      expect(peak2).toBe(3);
      expect(queue.size).toBe(3);
    });

    test("should return same value on consecutive calls", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9], numberComparator);
      expect(queue.peak()).toBe(1);
      expect(queue.peak()).toBe(1);
      expect(queue.size).toBe(5);
    });
  });

  describe("Size", () => {
    test("should return 0 for empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      expect(queue.size).toBe(0);
    });

    test("should return correct size after insertions", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(1);
      expect(queue.size).toBe(1);
      queue.insert(2);
      expect(queue.size).toBe(2);
      queue.insert(3);
      expect(queue.size).toBe(3);
    });

    test("should return correct size after extractions", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9], numberComparator);
      expect(queue.size).toBe(5);
      queue.extractMin();
      expect(queue.size).toBe(4);
      queue.extractMin();
      expect(queue.size).toBe(3);
    });

    test("should return 0 after extracting all elements", () => {
      const queue = new MinPriorityQueue([1, 2, 3], numberComparator);
      queue.extractMin();
      queue.extractMin();
      queue.extractMin();
      expect(queue.size).toBe(0);
    });
  });

  describe("IsEmpty", () => {
    test("should return true for empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      expect(queue.isEmpty).toBe(true);
    });

    test("should return false for non-empty queue", () => {
      const queue = new MinPriorityQueue([1], numberComparator);
      expect(queue.isEmpty).toBe(false);
    });

    test("should return true after extracting all elements", () => {
      const queue = new MinPriorityQueue([1, 2, 3], numberComparator);
      queue.extractMin();
      queue.extractMin();
      queue.extractMin();
      expect(queue.isEmpty).toBe(true);
    });
  });

  describe("Sort", () => {
    test("should return empty array for empty queue", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort queue with single element", () => {
      const queue = new MinPriorityQueue([5], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([5]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
      expect(queue.peak()).toBe(null);
    });

    test("should sort queue with two elements", () => {
      const queue = new MinPriorityQueue([5, 3], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([3, 5]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
      expect(queue.peak()).toBe(null);
    });

    test("should sort queue with multiple elements", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9, 2], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([1, 2, 3, 5, 8, 9]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
      expect(queue.peak()).toBe(null);
    });

    test("should return sorted array in ascending order", () => {
      const queue = new MinPriorityQueue(
        [9, 3, 7, 1, 5, 8, 2, 6, 4],
        numberComparator,
      );
      const result = queue.sort();
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort queue with duplicate values", () => {
      const queue = new MinPriorityQueue([3, 1, 3, 2, 1, 3], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([1, 1, 2, 3, 3, 3]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort queue with all same values", () => {
      const queue = new MinPriorityQueue([5, 5, 5, 5, 5], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([5, 5, 5, 5, 5]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort queue with negative numbers", () => {
      const queue = new MinPriorityQueue([5, -3, 8, -1, 0], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([-3, -1, 0, 5, 8]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort queue with decimal numbers", () => {
      const queue = new MinPriorityQueue(
        [3.5, 1.2, 2.8, 0.5, 4.1],
        numberComparator,
      );
      const result = queue.sort();
      expect(result).toEqual([0.5, 1.2, 2.8, 3.5, 4.1]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort already sorted array", () => {
      const queue = new MinPriorityQueue([1, 2, 3, 4, 5], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort reverse sorted array", () => {
      const queue = new MinPriorityQueue([5, 4, 3, 2, 1], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([1, 2, 3, 4, 5]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should sort large queue", () => {
      const largeArray = Array.from({ length: 100 }, (_, i) => 100 - i);
      const queue = new MinPriorityQueue(largeArray, numberComparator);
      const result = queue.sort();
      expect(result).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should not allow extraction after sorting", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9], numberComparator);
      queue.sort();
      expect(queue.extractMin()).toBe(null);
      expect(queue.peak()).toBe(null);
    });

    test("should handle sort on queue created from constructor", () => {
      const queue = new MinPriorityQueue([10, 20, 15, 5, 25], numberComparator);
      const result = queue.sort();
      expect(result).toEqual([5, 10, 15, 20, 25]);
      expect(queue.isEmpty).toBe(true);
    });

    test("should handle sort on queue with inserted elements", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      queue.insert(1);
      const result = queue.sort();
      expect(result).toEqual([1, 3, 5, 8]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });

    test("should handle sort after some extractions", () => {
      const queue = new MinPriorityQueue([5, 3, 8, 1, 9, 2], numberComparator);
      queue.extractMin();
      queue.extractMin();
      expect(queue.size).toBe(4);
      const result = queue.sort();
      expect(result).toEqual([3, 5, 8, 9]);
      expect(queue.isEmpty).toBe(true);
      expect(queue.size).toBe(0);
    });
  });

  describe("FrequencyCode Objects", () => {
    test("should create queue with FrequencyCode objects", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      expect(queue.size).toBe(0);
      expect(queue.isEmpty).toBe(true);
    });

    test("should insert FrequencyCode objects and maintain priority by frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 15, code: "C" });
      queue.insert({ frequency: 3, code: "D" });

      expect(queue.peak()?.frequency).toBe(3);
      expect(queue.peak()?.code).toBe("D");
      expect(queue.size).toBe(4);
    });

    test("should extract FrequencyCode objects in order of increasing frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 15, code: "C" });
      queue.insert({ frequency: 3, code: "D" });
      queue.insert({ frequency: 7, code: "E" });

      const extracted: FrequencyCode[] = [];
      while (!queue.isEmpty) {
        extracted.push(queue.extractMin()!);
      }

      expect(extracted).toEqual([
        { frequency: 3, code: "D" },
        { frequency: 5, code: "B" },
        { frequency: 7, code: "E" },
        { frequency: 10, code: "A" },
        { frequency: 15, code: "C" },
      ]);
    });

    test("should handle FrequencyCode objects with same frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 5, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 5, code: "C" });
      queue.insert({ frequency: 3, code: "D" });

      expect(queue.extractMin()?.frequency).toBe(3);
      expect(queue.extractMin()?.frequency).toBe(5);
      expect(queue.extractMin()?.frequency).toBe(5);
      expect(queue.extractMin()?.frequency).toBe(5);
    });

    test("should maintain heap property after extracting FrequencyCode objects", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 15, code: "C" });
      queue.insert({ frequency: 3, code: "D" });
      queue.insert({ frequency: 7, code: "E" });

      expect(queue.extractMin()?.frequency).toBe(3);
      expect(queue.peak()?.frequency).toBe(5);
      expect(queue.extractMin()?.frequency).toBe(5);
      expect(queue.peak()?.frequency).toBe(7);
    });

    test("should sort FrequencyCode objects by frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 15, code: "C" });
      queue.insert({ frequency: 3, code: "D" });
      queue.insert({ frequency: 7, code: "E" });

      const result = queue.sort();
      expect(result).toEqual([
        { frequency: 3, code: "D" },
        { frequency: 5, code: "B" },
        { frequency: 7, code: "E" },
        { frequency: 10, code: "A" },
        { frequency: 15, code: "C" },
      ]);
      expect(queue.isEmpty).toBe(true);
    });

    test("should create queue from array of FrequencyCode objects", () => {
      const items: FrequencyCode[] = [
        { frequency: 10, code: "A" },
        { frequency: 5, code: "B" },
        { frequency: 15, code: "C" },
        { frequency: 3, code: "D" },
      ];
      const queue = new MinPriorityQueue(items, frequencyComparator);

      expect(queue.peak()?.frequency).toBe(3);
      expect(queue.peak()?.code).toBe("D");
      expect(queue.size).toBe(4);
    });

    test("should handle FrequencyCode objects with zero frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 5, code: "A" });
      queue.insert({ frequency: 0, code: "B" });
      queue.insert({ frequency: 10, code: "C" });

      expect(queue.peak()?.frequency).toBe(0);
      expect(queue.extractMin()?.code).toBe("B");
      expect(queue.extractMin()?.frequency).toBe(5);
      expect(queue.extractMin()?.frequency).toBe(10);
    });

    test("should handle FrequencyCode objects with large frequencies", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 1000, code: "A" });
      queue.insert({ frequency: 100, code: "B" });
      queue.insert({ frequency: 500, code: "C" });
      queue.insert({ frequency: 50, code: "D" });

      expect(queue.extractMin()?.frequency).toBe(50);
      expect(queue.extractMin()?.frequency).toBe(100);
      expect(queue.extractMin()?.frequency).toBe(500);
      expect(queue.extractMin()?.frequency).toBe(1000);
    });

    test("should handle mixed insert and extract operations for FrequencyCode", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      expect(queue.extractMin()?.code).toBe("B");
      queue.insert({ frequency: 3, code: "C" });
      queue.insert({ frequency: 7, code: "D" });
      expect(queue.extractMin()?.code).toBe("C");
      expect(queue.peak()?.code).toBe("D");
    });

    test("should preserve code field when extracting by frequency", () => {
      const queue = new MinPriorityQueue<FrequencyCode>(
        [],
        frequencyComparator,
      );
      queue.insert({ frequency: 10, code: "A" });
      queue.insert({ frequency: 5, code: "B" });
      queue.insert({ frequency: 15, code: "C" });

      const item = queue.extractMin();
      expect(item?.frequency).toBe(5);
      expect(item?.code).toBe("B");
      expect(item).toEqual({ frequency: 5, code: "B" });
    });
  });

  describe("Custom Comparators", () => {
    test("should work with string comparator", () => {
      const stringComparator = (a: string, b: string) => a.localeCompare(b);
      const queue = new MinPriorityQueue<string>([], stringComparator);
      queue.insert("zebra");
      queue.insert("apple");
      queue.insert("banana");
      expect(queue.peak()).toBe("apple");
      expect(queue.extractMin()).toBe("apple");
      expect(queue.extractMin()).toBe("banana");
      expect(queue.extractMin()).toBe("zebra");
    });

    test("should work with object comparator (different from FrequencyCode)", () => {
      interface Person {
        name: string;
        age: number;
      }
      const personComparator = (a: Person, b: Person) => a.age - b.age;
      const queue = new MinPriorityQueue<Person>([], personComparator);
      queue.insert({ name: "Alice", age: 30 });
      queue.insert({ name: "Bob", age: 25 });
      queue.insert({ name: "Charlie", age: 35 });
      expect(queue.peak()?.name).toBe("Bob");
      expect(queue.extractMin()?.name).toBe("Bob");
      expect(queue.extractMin()?.name).toBe("Alice");
      expect(queue.extractMin()?.name).toBe("Charlie");
    });

    test("should work with reverse number comparator (max priority)", () => {
      const reverseComparator = (a: number, b: number) => b - a;
      const queue = new MinPriorityQueue([], reverseComparator);
      queue.insert(5);
      queue.insert(3);
      queue.insert(8);
      // Зворотний компаратор - максимум має найвищий пріоритет
      expect(queue.peak()).toBe(8);
      expect(queue.extractMin()).toBe(8);
      expect(queue.extractMin()).toBe(5);
      expect(queue.extractMin()).toBe(3);
    });

    test("should work with custom priority based on absolute value", () => {
      const absComparator = (a: number, b: number) => Math.abs(a) - Math.abs(b);
      const queue = new MinPriorityQueue([], absComparator);
      queue.insert(-5);
      queue.insert(3);
      queue.insert(-8);
      queue.insert(2);
      expect(queue.peak()).toBe(2);
      expect(queue.extractMin()).toBe(2);
      expect(queue.extractMin()).toBe(3);
      expect(queue.extractMin()).toBe(-5);
      expect(queue.extractMin()).toBe(-8);
    });
  });

  describe("Edge Cases", () => {
    test("should handle single element queue correctly", () => {
      const queue = new MinPriorityQueue([42], numberComparator);
      expect(queue.peak()).toBe(42);
      expect(queue.extractMin()).toBe(42);
      expect(queue.isEmpty).toBe(true);
    });

    test("should handle two element queue correctly", () => {
      const queue = new MinPriorityQueue([5, 3], numberComparator);
      expect(queue.peak()).toBe(3);
      expect(queue.extractMin()).toBe(3);
      expect(queue.peak()).toBe(5);
    });

    test("should handle all same values", () => {
      const queue = new MinPriorityQueue([5, 5, 5, 5, 5], numberComparator);
      expect(queue.size).toBe(5);
      while (!queue.isEmpty) {
        expect(queue.extractMin()).toBe(5);
      }
    });

    test("should handle already sorted array", () => {
      const queue = new MinPriorityQueue([1, 2, 3, 4, 5], numberComparator);
      expect(queue.peak()).toBe(1);
      for (let i = 1; i <= 5; i++) {
        expect(queue.extractMin()).toBe(i);
      }
    });

    test("should handle reverse sorted array", () => {
      const queue = new MinPriorityQueue([5, 4, 3, 2, 1], numberComparator);
      expect(queue.peak()).toBe(1);
      for (let i = 1; i <= 5; i++) {
        expect(queue.extractMin()).toBe(i);
      }
    });

    test("should handle negative and positive numbers", () => {
      const queue = new MinPriorityQueue(
        [-5, 3, -8, 1, -9, 2, 0],
        numberComparator,
      );
      expect(queue.extractMin()).toBe(-9);
      expect(queue.extractMin()).toBe(-8);
      expect(queue.extractMin()).toBe(-5);
      expect(queue.extractMin()).toBe(0);
      expect(queue.extractMin()).toBe(1);
      expect(queue.extractMin()).toBe(2);
      expect(queue.extractMin()).toBe(3);
    });
  });

  describe("Complex Operations", () => {
    test("should handle mixed insert and extract operations", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(3);
      expect(queue.extractMin()).toBe(3);
      queue.insert(8);
      queue.insert(1);
      expect(queue.extractMin()).toBe(1);
      queue.insert(2);
      expect(queue.extractMin()).toBe(2);
      expect(queue.peak()).toBe(5);
    });

    test("should handle large number of operations", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      for (let i = 100; i >= 1; i--) {
        queue.insert(i);
      }
      expect(queue.size).toBe(100);
      expect(queue.peak()).toBe(1);
      for (let i = 1; i <= 100; i++) {
        expect(queue.extractMin()).toBe(i);
      }
      expect(queue.isEmpty).toBe(true);
    });

    test("should handle operations with negative numbers", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(5);
      queue.insert(-3);
      queue.insert(8);
      queue.insert(-1);
      queue.insert(0);
      expect(queue.extractMin()).toBe(-3);
      expect(queue.extractMin()).toBe(-1);
      expect(queue.extractMin()).toBe(0);
    });

    test("should handle operations with decimal numbers", () => {
      const queue = new MinPriorityQueue<number>([], numberComparator);
      queue.insert(3.5);
      queue.insert(1.2);
      queue.insert(2.8);
      queue.insert(0.5);
      queue.insert(4.1);
      expect(queue.extractMin()).toBe(0.5);
      expect(queue.extractMin()).toBe(1.2);
      expect(queue.extractMin()).toBe(2.8);
    });
  });
});
