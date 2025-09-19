export const linearSearch = (arr: number[], target: number): number => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }

  return -1;
};

// Optimized version
// avoid n "i < arr.length" check
export const sentinelLinearSearch = (arr: number[], target: number): number => {
  if(arr.length === 0) return -1;

  const length = arr.length;
  const lastIndex  = length - 1;
  const lastItem = arr[lastIndex];
  arr[lastIndex] = target; // Sentinel

  let i = 0;
  while (arr[i] !== target) {
    i++;
  }

  // @ts-ignore
  arr[lastIndex] = lastItem; // return back last item

  return i < lastIndex || arr[lastIndex] === target ? i : -1;
};
