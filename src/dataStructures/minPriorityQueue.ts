export type Comparator<T> = (a: T, b: T) => number;
// < 0  => a < b
// = 0  => a === b
// > 0  => a > b

export class MinPriorityQueue<T> {
  // start from the 0 position
  // left = 2i+1, right = 2i + 2, father = (i-1)/2
  private heap: T[];
  private lastIndex: number;
  private compare: Comparator<T>;

  constructor(arr: T[] = [], compare: Comparator<T>) {
    this.compare = compare;

    if (arr.length === 0) {
      this.heap = [];
      this.lastIndex = -1;
      return;
    }

    this.heap = arr;
    this.lastIndex = arr.length - 1;
    for (let i = arr.length >> 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  insert(item: T) {
    this.heap[++this.lastIndex] = item;
    this.siftUp(this.lastIndex);
  }

  get size(): number {
    return this.lastIndex + 1;
  }

  get isEmpty(): boolean {
    return this.lastIndex < 0;
  }

  peak(): T | null {
    if (this.isEmpty || this.heap[0] === undefined) return null;

    return this.heap[0];
  }

  extractMin(): T | null {
    if (this.isEmpty) return null;

    const min = this.heap[0];
    if (min === undefined) {
      throw new Error("MinPriorityQueue extractMin: min is undefined!");
    }

    const lastItem = this.heap[this.lastIndex];
    this.lastIndex--;
    if (lastItem === undefined) {
      throw new Error("MinPriorityQueue extractMin: lastItem is undefined!");
    }
    this.heap[0] = lastItem;
    this.siftDown(0);

    return min;
  }

  sort(): T[] {
    if (this.isEmpty) return [];
    const result: T[] = [];

    while (!this.isEmpty) {
      const item = this.extractMin();
      if (item === null) {
        throw new Error(
          "MinPriorityQueue sort: extractMin returned null in non-empty heap!",
        );
      }
      result.push(item);
    }

    return result;
  }

  private swap(indexOne: number, indexTwo: number): void {
    const a = this.heap[indexOne];
    const b = this.heap[indexTwo];
    if (a === undefined || b === undefined) {
      throw new Error("MinPriorityQueue swap: index out of bounds!");
    }
    this.heap[indexOne] = b;
    this.heap[indexTwo] = a;
  }

  private isLess(a: T | undefined, b: T | undefined) {
    if (a === undefined || b === undefined) {
      throw new Error("MinPriorityQueue isLess: a or b is undefined!");
    }
    return this.compare(a, b) < 0;
  }

  private siftUp(index: number) {
    while (
      index > 0 &&
      this.isLess(this.heap[index], this.heap[(index - 1) >> 1])
    ) {
      const parentIndex = (index - 1) >> 1;

      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private siftDown(index: number) {
    while (2 * index + 1 <= this.lastIndex) {
      let minIndex = index;

      // left child
      const leftChildIndex = 2 * index + 1;

      if (this.isLess(this.heap[leftChildIndex], this.heap[minIndex])) {
        minIndex = leftChildIndex;
      }

      // right child
      const rightChildIndex = 2 * index + 2;
      if (
        rightChildIndex <= this.lastIndex &&
        this.isLess(this.heap[rightChildIndex], this.heap[minIndex])
      ) {
        minIndex = rightChildIndex;
      }

      if (index === minIndex) break;

      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}
