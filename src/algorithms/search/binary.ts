export const binarySearch = (array: number[], target: number): number => {
  if (array.length === 0) return 0;

  let bad = -1;
  let good = array.length;

  while (good - bad > 1) {
    // Fix overflow in other languages
    // const m = bad + (good - bad) / 2;
    const m = Math.trunc((bad + good) / 2);

    if (array[m]! >= target) {
      good = m;
    } else {
      bad = m;
    }
  }

  return good;
};

export const binarySearchFirstEntry = (
  array: number[],
  target: number,
): number => {
  if (array.length === 0) return -1;

  let bad = -1;
  let good = array.length;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (array[m]! >= target) {
      good = m;
    } else {
      bad = m;
    }
  }

  return array[good] === target ? good : -1;
};

export const binarySearchLastEntry = (
  array: number[],
  target: number,
): number => {
  if (array.length === 0) return -1;

  let bad = -1;
  let good = array.length;

  while (good - bad > 1) {
    const m = Math.trunc((good + bad) / 2);

    if (array[m]! > target) {
      good = m;
    } else {
      bad = m;
    }
  }

  return array[bad] === target ? bad : -1;
};
