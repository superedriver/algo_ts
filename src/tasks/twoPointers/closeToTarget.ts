// Sorted array and target
// return 2 values which sum is closest to the target
export const closeToTarget = (arr: number[], target: number): number[] => {
  let left = 0;
  let right = arr.length - 1;
  let diff = Infinity;
  let res_i = 0;
  let res_j = 0;

  while (left < right) {
    if (Math.abs(arr[left]! + arr[right]! - target) < diff) {
      res_i = left;
      res_j = right;
      diff = Math.abs(arr[left]! + arr[right]! - target);
    } else if (arr[left]! + arr[right]! > target) {
      right--;
    } else {
      left++;
    }
  }

  return [arr[res_i]!, arr[res_j]!];
};
