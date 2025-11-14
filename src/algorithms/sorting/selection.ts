export const selectionSort = (array: number[]) => {
  const lastIndex = array.length - 1;

  for (let i = 0; i <= lastIndex; i++) {
    let minIndex = i;

    for (let j = i; j <= lastIndex; j++) {
      if (array[j]! < array[minIndex]!) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex]!;
    array[minIndex] = temp!;
  }

  return array;
};
