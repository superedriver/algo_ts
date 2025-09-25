const isGoodEnough = (
  side: number,
  width: number,
  height: number,
  amount: number,
): boolean => {
  return Math.trunc(side / width) * Math.trunc(side / height) >= amount;
};

// Have width, height, amount of diplomas
// Find a side of the minimum square board to place all the diplomas.
// Diplomas can not be rotated.
export const findMinBoardSize = (
  width: number,
  height: number,
  amount: number,
): number => {
  let bad = 0;
  let good = Math.max(width, height) * amount;

  while (good - bad > 1) {
    const side = Math.trunc((bad + good) / 2);
    if (isGoodEnough(side, width, height, amount)) {
      good = side;
    } else {
      bad = side;
    }
  }
  return good;
};
