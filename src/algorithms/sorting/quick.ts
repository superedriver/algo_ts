const getPivot = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const lomutoPartition = (array: number[], left: number, right: number) => {
  const pivot = getPivot(left, right);
  // move pivot to the left index
  [array[left], array[pivot]] = [array[pivot]!, array[left]!];

  let rightLessThanPivotIndex = left + 1;

  for (let i = rightLessThanPivotIndex; i <= right; i++) {
    if (array[i]! < array[left]) {
      [array[i], array[rightLessThanPivotIndex]] = [
        array[rightLessThanPivotIndex]!,
        array[i]!,
      ];
      rightLessThanPivotIndex++;
    }
  }
  // move pivot to its place
  const pivotIndex = rightLessThanPivotIndex - 1;

  [array[left], array[pivotIndex]] = [array[pivotIndex]!, array[left]!];
  return pivotIndex;
};

const hoarPartition = (array: number[], left: number, right: number) => {
  const pivot = getPivot(left, right);

  // // move pivot to the left index
  // [array[left], array[pivot]] = [array[pivot]!, array[left]!];

  const pivotValue = array[pivot];

  let i = left,
    j = right;

  while (i <= j) {
    while (array[i]! < pivotValue!) {
      i++;
    }
    while (array[j]! > pivotValue!) {
      j--;
    }

    if (i <= j) {
      [array[i], array[j]] = [array[j]!, array[i]!];
      i++;
      j--;
    }
  }

  return j;
};

export const quickSort = (
  array: number[],
  left = 0,
  right = array.length - 1,
): number[] => {
  if (left >= right) {
    return array;
  }
  // // lomuto
  // const pivot = lomutoPartition(array, left, right);
  // quickSort(array, left, pivot - 1);
  // quickSort(array, pivot + 1, right);

  //hoar
  const pivot = hoarPartition(array, left, right);
  quickSort(array, left, pivot);
  quickSort(array, pivot + 1, right);
  return array;
};

console.log(quickSort([2, 5, 7, 10, -5, 8, 2]));
