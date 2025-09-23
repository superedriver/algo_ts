const isGoodEnough = (
  side: number,
  width: number,
  height: number,
  amount: number,
): boolean => {
  return Math.trunc(side / width) * Math.trunc(side / height) >= amount;
};

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
