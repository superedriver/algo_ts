export class MinHeap {
  // start from the 1st position
  // left = 2i, right = 2i + 1, father = i/2
  private heap: number[];
  private lastIndex: number;

  constructor(arr: number[] = []) {
    this.heap = [0, ...arr];
    this.lastIndex = arr.length;
    for (let i = Math.trunc(this.heap.length / 2) + 1; i > 0; i--) {
      this.siftDown(i);
    }
  }

  insert(val: number) {
    this.heap[++this.lastIndex] = val;
    this.siftUp(this.lastIndex);
  }

  get size() {
    return this.lastIndex;
  }

  extractMin() {
    if (this.isEmpty) {
      return null;
    }
    const min = this.heap[1];
    this.heap[1] = this.heap[this.lastIndex--]!;
    this.siftDown(1);
    return min;
  }

  peak() {
    if (this.isEmpty) {
      return null;
    }

    return this.heap[1];
  }

  sort() {
    if (this.isEmpty) return;
    const result = [];
    while (!this.isEmpty) {
      result.push(this.extractMin());
    }

    return result;
  }

  get isEmpty() {
    return this.lastIndex === 0;
  }

  private siftUp(index: number) {
    while (index > 1 && this.heap[index]! < this.heap[Math.trunc(index / 2)]!) {
      const parentIndex = Math.trunc(index / 2);
      const temp = this.heap[index];
      this.heap[index] = this.heap[parentIndex]!;
      this.heap[parentIndex] = temp!;
      index = parentIndex;
    }
  }

  private siftDown(index: number) {
    let tempMinIndex = index;
    while (2 * index <= this.lastIndex) {
      if (this.heap[2 * index]! < this.heap[index]!) {
        tempMinIndex = 2 * index;
      }

      if (
        2 * index + 1 <= this.lastIndex &&
        this.heap[2 * index + 1]! < this.heap[tempMinIndex]!
      ) {
        tempMinIndex = 2 * index + 1;
      }

      if (tempMinIndex === index) {
        break;
      }

      const temp = this.heap[tempMinIndex]!;
      this.heap[tempMinIndex] = this.heap[index]!;
      this.heap[index] = temp;

      index = tempMinIndex;
    }
  }
}
