const merge = (arr: number[], l: number, m: number, r: number): number[] => {
  const c = [];

  for (let i = l; i < m; i++) {
    c.push(arr[i]);
  }

  let i = 0;
  let j = m;
  let k = l;

  while (i < c.length && j < r) {
    if(c[i]! < arr[j]!) {
      arr[k] = c[i]!;
      i++;
      k++;
    } else {
      arr[k] = arr[j]!;
      j++;
      k++;
    }
  }

  while (i < c.length) {
    arr[k] = c[i]!;
    i++;
    k++;
  }

  while (j < r) {
    arr[k] = arr[j]!;
    j++;
    k++;
  }

  return arr;
};

export const mergeSort = (
  arr: number[],
  l: number = 0,
  r: number = arr.length,
): number[] => {
  if (r - l <= 1) return arr;
  const m = (l + r) >> 1;
  mergeSort(arr, l, m);
  mergeSort(arr, m, r);
  merge(arr, l, m, r);
  return arr;
};



console.log(mergeSort([5,4,9,7, 0, -2,3,2,1]));
console.log(mergeSort([0]));