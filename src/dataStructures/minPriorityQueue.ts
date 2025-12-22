export type Comparator<T> = (a: T, b: T) => number;
// < 0  => a < b
// = 0  => a === b
// > 0  => a > b

export class MinPriorityQueue<T> {
  // start from the 0 position
  // left = 2i+1, right = 2i + 2, father = (i-1)/2
  heap: T[];
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
    return this.lastIndex === -1;
  }

  peak(): T | null {
    if (this.isEmpty) return null;

    return this.heap[0]!;
  }

  extractMin(): T | null {
    if (this.isEmpty) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap[this.lastIndex--]!;
    this.siftDown(0);

    return min!;
  }

  sort(): T[] {
    if (this.isEmpty) return [];
    const result: T[] = [];

    while (!this.isEmpty) {
      result.push(this.extractMin()!);
    }

    return result;
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo]!;
    this.heap[indexTwo] = temp!;
  }

  private isLess(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  private siftUp(index: number) {
    while (
      index > 0 &&
      this.isLess(this.heap[index]!, this.heap[(index - 1) >> 1]!)
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

      if (this.isLess(this.heap[leftChildIndex]!, this.heap[minIndex]!)) {
        minIndex = leftChildIndex;
      }

      // right child
      const rightChildIndex = 2 * index + 2;
      if (
        rightChildIndex <= this.lastIndex &&
        this.isLess(this.heap[rightChildIndex]!, this.heap[minIndex]!)
      ) {
        minIndex = rightChildIndex;
      }

      if (index === minIndex) break;

      this.swap(index, minIndex);
      index = minIndex;
    }
  }
}
