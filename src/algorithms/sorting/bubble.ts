export const bubbleSort = (array: number[]): number[] => {
  const sortedArray = [...array];
  const lastIndex = array.length - 1;

  for (let i = 0; i < lastIndex; ++i) {
    for (let j = 0; j < lastIndex - i; ++j) {
      if (sortedArray[j]! > sortedArray[j + 1]!) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1]!;
        sortedArray[j + 1] = temp!;
      }
    }
  }

  return sortedArray;
};
