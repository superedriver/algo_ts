export const selectionSort = (array: number[]) => {
  const sortedArray = [...array];
  const lastIndex = sortedArray.length - 1;

  for (let i = 0; i <= lastIndex; i++) {
    let minIndex = i;

    for (let j = i; j <= lastIndex; j++) {
      if (sortedArray[j]! < sortedArray[minIndex]!) {
				minIndex = j;
      }
    }
		const temp = sortedArray[i];
		sortedArray[i] = sortedArray[minIndex]!;
		sortedArray[minIndex] = temp!;
  }

	return sortedArray;
};
