export const insertionSort = (array: number[]): number[] => {
  const sortedArray = [...array];

  for (let i = 1; i < sortedArray.length; i++) {
    let j = i;
    while (j > 0 && sortedArray[j]! < sortedArray[j - 1]!) {
      const temp = sortedArray[j];
      sortedArray[j] = sortedArray[j - 1]!;
      sortedArray[j - 1] = temp!;
      --j;
    }
  }

  return sortedArray;
};

// Use BinarySearch for insertion index
const findInsertionIndex = (
  array: number[],
  currentTargetIndex: number,
): number => {
  const target = array[currentTargetIndex]!;
  let bad = -1;
  let good = currentTargetIndex;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (array[m]! >= target) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};

export const binaryInsertionSort = (array: number[]) => {
  const sortedArray = [...array];

  for (let i = 1; i < sortedArray.length; i++) {
    const insertionIndex = findInsertionIndex(sortedArray, i);
    let j = i;

    while (j > insertionIndex) {
			const temp = sortedArray[j];
      sortedArray[j] = sortedArray[j - 1]!;
      sortedArray[j - 1] = temp!;
      --j;
    }
  }

  return sortedArray;
};
