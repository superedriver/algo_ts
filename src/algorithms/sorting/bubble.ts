export const bubbleSort = (array: number[]): number[] => {
  const lastIndex = array.length - 1;

  for (let i = 0; i < lastIndex; ++i) {
    for (let j = 0; j < lastIndex - i; ++j) {
      if (array[j]! > array[j + 1]!) {
        const temp = array[j];
        array[j] = array[j + 1]!;
        array[j + 1] = temp!;
      }
    }
  }

  return array;
};
