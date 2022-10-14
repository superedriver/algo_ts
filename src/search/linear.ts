export function linearSearch(arr: number[], item: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) return i;
  }
  return -1;
}

// avoid n "i < arr.length" check
export function sentinelLinearSearch(arr: number[], item: number): number {
  arr[arr.length] = item;
  let i = 0;
  while (arr[i] !== item) {
    i += 1;
  }

  return i === arr.length - 1 ? -1 : i;
}
